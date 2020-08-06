import React from 'react';
import * as activityFns from './activityfns.js';
import ActivityDay from './activityday.js';
import '../../styles/activities.css';
import * as DB from '../../constants/database.js';
import app from '../Firebase';

const db = app.firestore();

/**
 * ReactJS class component for the list of activities. 
 * 
 * @property {Object} props ReactJS props.
 * @property {string} props.tripId The tripID.
 */
class ActivityList extends React.Component {
  /** @override */
  constructor(props) {
    super(props);
    this.state = { days : [] };

    this.getActivityList = this.getActivityList.bind(this);
  }

  /**
   * Gets the list of activities from the server. 
   * 
   * This function sets `this.state.days` to the sorted days.
   * 
   * @param {!string} tripId The trip ID.
   */
  async getActivityList(tripId) {
    db.collection(DB.COLLECTION_TRIPS).doc(tripId)
    .collection(DB.COLLECTION_ACTIVITIES)
    .onSnapshot(querySnapshot => {
      let tripActivities = [];
      this.setState({days: []});
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        let data = doc.data();
        data['id'] = doc.id;
        data['tripId'] = tripId;
        
        // TODO: if start date != end date, split into 2 days. (#37)

        if (data[DB.ACTIVITIES_START_TIME] !== undefined) {// not in new mode
          // Eliminate nanoseconds, convert to milliseconds.
          data[DB.ACTIVITIES_START_TIME] =
            data[DB.ACTIVITIES_START_TIME]['seconds'] * 1000;         
          data[DB.ACTIVITIES_END_TIME] = 
            data[DB.ACTIVITIES_END_TIME]['seconds'] * 1000;
        }
        tripActivities.push(data);
      });
      this.setState({ days: activityFns.sortByDate(tripActivities) });
    });
    
  }

  /** 
   * @override
   * 
   * Get sorted list of activities from the database. 
   * 
   * This function only queries the database if `this.state` is defined.
   * `this.state` gains an entry with key `days` with the list of activities 
   * sorted by date. 
   */
  async componentDidMount() {
    if (this.state === null || this.props.tripId === null) { return; }
    await this.getActivityList(this.props.tripId);
  }

  /** @override */
  render() {
    if (this.state === null) { return (<div></div>); }
    if (this.state.days === null) {
      return (<p className='activity-list'>An error has occurred :(</p> );
    } else if (this.state.days.length === 0) {
      return (<p className='activity-list'>Plan your trip here!</p>);
    }

    return (
      <div className='activity-list'>
        {this.state.days.map((item, index) => (
          <ActivityDay date={item[0]} activities={item[1]} key={index}/>
        ))}
      </div>
    );
  }
}

export default ActivityList;
