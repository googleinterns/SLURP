import React from 'react';
import * as time from '../Utils/time.js';
import * as DB from '../../constants/database.js'
import '../../styles/activities.css';
import EditActivity from './editActivity.js';
import { Accordion, Card } from 'react-bootstrap';
import * as utils from './activityfns.js';


/**
 * React component for a single activity. 
 * 
 * @property {Object} props ReactJS props. 
 * @property {ActivityInfo} props.activity The activity to display.
 *    (MUST contain 'id' field with database activity id and 'tripId' field.)
 */
class Activity extends React.Component {
  /** @override */
  constructor(props) {
    super(props);

    this.state = { editing: false };
  }

  /**
   * Set the activity into editing mode.
   */
  setEditActivity() {
    this.setState({editing: true});
  }

  /**
   * Set the activity into viewing mode.
   */
  finishEditActivity = () => { this.setState({editing: false}); };

  /**
   * Display the current activity, either in view or edit mode.
   * 
   * @return {JSX.Element} The current activity in correct mode.
   */
  displayCard = () => {
    let activity = this.props.activity;
    if (!this.state.editing) { // View mode.
      return (
        <Card.Body onClick={this.setEditActivity}>
          <p>{utils.getField(activity, DB.ACTIVITIES_DESCRIPTION, '')}</p>
          <p>Start time: {time.timestampToFormatted(activity[DB.ACTIVITIES_START_TIME], 
              utils.getField(activity, DB.ACTIVITIES_START_TZ))} 
            {utils.getField(activity, DB.ACTIVITIES_START_COUNTRY, '', ' at ')}</p>
          <p>End time: {time.timestampToFormatted(activity[DB.ACTIVITIES_END_TIME], 
              utils.getField(activity, DB.ACTIVITIES_END_TZ))} 
            {utils.getField(activity, DB.ACTIVITIES_END_COUNTRY, '', ' at ')}</p>
        </Card.Body>
      );
    } else { // Edit mode.
      return ( 
        <EditActivity 
          activity={this.props.activity} 
          submitFunction={this.finishEditActivity} 
          new={false} 
        />
      );
    }
  }

  /** @override */
  render() {
    const activity = this.props.activity;
    return (
      <Accordion defaultActiveKey='1'>  
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0' align='center'>
            {activity[DB.ACTIVITIES_TITLE]}
          </Accordion.Toggle>
          <Accordion.Collapse 
            eventKey='0' 
            className={'view-activity' + (this.state.editing? ' edit': '')}
            >
            { this.displayCard() }
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
};

export default Activity;
