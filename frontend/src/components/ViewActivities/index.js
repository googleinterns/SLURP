import React from 'react';
import ActivityList from './activitylist.js';
import EditActivity from './editActivity.js';
import { Button, Modal } from 'react-bootstrap';
import app from '../Firebase'; 
import * as DB from '../../constants/database.js';
import { firestore } from 'firebase';
import { getCurUserUid } from '../AuthUtils';
import * as ErrorComponents from '../Errors';
import Header from '../Header';

const db = app.firestore();
/**
 * The view activities page. First checks that the current user is authorized to
 * view the current trip (i.e. they are a collaborator for it). If so, the
 * ActivityList component is displayed as normal. If not, an error is displayed
 * instead.
 *
 * @param {Object} props This component expects the following props:
 * - `tripId` {string} The trip's ID. This is sent to the component through the URL.
 */
class ViewActivities extends React.Component {
  constructor(props) {
    super(props);
    this.tripId = props.match.params.tripId;
    this.state = {
      collaborators: undefined,
      isLoading: true,
      error: undefined,
      addingActivity : false 
    };
    this.doneAddingActivity = this.doneAddingActivity.bind(this);
  }

  /**
   * Create an empty activity (with filler information) to edit and then display.
   * Allows us to use editActivity instead of creating a whole new form for it. 
   * 
   * @param {string} tripId The tripId to attach to this new activity.
   * @return {Object} Data filled into new Activity.
   */
  createEmptyActivity = (tripId) => {
    const newAct = db.collection(DB.COLLECTION_TRIPS).doc(tripId)
      .collection(DB.COLLECTION_ACTIVITIES).doc();
    const data = { 
      fillerstamp : firestore.Timestamp.now(), 
      id: newAct.id, 
      tripId: tripId
    };
    newAct.set(data);
    return data;
  }

  /**
   * Complete "Add Activity" operation
   */
  addActivity = (e) => {
    e.preventDefault();
    this.setState({ addingActivity: true });

    const newData = this.createEmptyActivity(this.props.match.params.tripId);
    this.setState({ newAct: newData });
  }

  /**
   * Runs when the user is done adding an activity.
   */
  async doneAddingActivity() { 
    await this.setState({ 
      addingActivity: false,
      newAct: null 
    }); 
  };

  render() {
    const tripId = this.props.match.params.tripId;    
    if (this.state.error !== undefined) {
      return (
        <div>
          <Header />
          <ErrorComponents.ErrorGeneral />
        </div>
      );
    }
    // Case where the trip details are still being fetched.
    if (this.state.isLoading) {
      // TODO (Issue #25): Please remember to make this a blank div in the
      // deployed build lol.
      return (
        <div>
          <Header/>
          Loading Part 2: Electric Boogaloo
        </div>
      );
    }
    // Case where the trip could not be found or the current user is not
    // authorized to view the trip.
    else if (this.state.collaborators === undefined ||
             !this.state.collaborators.includes(getCurUserUid())) {
      return (
        <div>
          <Header/>
          <ErrorComponents.ErrorTripNotFound />
        </div>
      );
    }
    else {
      if (!this.state.addingActivity) {
        return (
          <div>
            <Header/>
            <div className='activity-page'> 
              <ActivityList tripId={tripId}/>
            </div>
            <Button type='button' onClick={this.addActivity}>+ Add</Button>
          </div>
        );
      } else {
        return (
          <Modal.Dialog>
            <Modal.Header>Add New Activity</Modal.Header>
            <Modal.Body>
              <EditActivity activity={this.state.newAct} 
                submitFunction={this.doneAddingActivity} new={true}/> 
            </Modal.Body>
          </Modal.Dialog>
        );
      }
    }
  }
      
  /** @inheritdoc */
  componentDidMount() {
    app.firestore()
        .collection(DB.COLLECTION_TRIPS)
        .doc(this.tripId)
        .get()
        .then(doc => {
          this.setState({
            collaborators: doc.get(DB.TRIPS_COLLABORATORS),
            isLoading: false,
            error: undefined
          });
        })
        .catch(e => {
          this.setState({
            collaborators: undefined,
            isLoading: true,
            error: e
          })
        });
  }
}

export default ViewActivities;
