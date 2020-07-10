import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Activity from './activity.js';
import * as activityFns from './activityfns.js';
import * as time from '../Utils/time.js'

class ActivityDay extends React.Component {
  /** @inheritdoc */
  render() {
    const sortedActivities = Array.from(this.props.activities)
          .sort(activityFns.compareActivities);
    let date = new Date(this.props.date);
    let id = date.getTime();
    return (
      <div className='activity-day'>
        <h4>{time.timestampToDateFormatted(date.getTime())}</h4>
        {sortedActivities.map((activity, index) => (
          <Accordion defaultActiveKey='1' key={index}>  
            <Activity activity={activity} key={index + id} className="activity"/>
          </Accordion>
        ))}
      </div>
    );
  }
}

export default ActivityDay;
