import React from 'react';
import Activity from './activity.js';
import * as activityFns from './activityfns.js';
import * as time from '../Utils/time.js'

/**
 * One single day of activities.
 *
 * @param {Object} props This component expects the following props:
 * - `activities` The list of activities for "today".
 * - `date` The date, formatted as "MM/DD/YYYY".
 */
class ActivityDay extends React.Component {
  /** @inheritdoc */
  render() {
    const sortedActivities = Array.from(this.props.activities)
          .sort(activityFns.compareActivities);
    let date = new Date(this.props.date);
    // let id = date.getTime();
    return (
      <div className='activity-day'>
        <h4>{time.timestampToDateFormatted(date.getTime())}</h4>
        {sortedActivities.map((activity, index) => (
          <Activity activity={activity} key={index} className="activity"/>
        ))}
      </div>
    );
  }
}

export default ActivityDay;
