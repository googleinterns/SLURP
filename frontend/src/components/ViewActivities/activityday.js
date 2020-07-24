import React from 'react';
import Activity from './activity.js';
import * as activityFns from './activityfns.js';
import * as time from '../Utils/time.js'

/**
 * React component for a single day of activities. 
 * 
 * @property {Object} props ReactJS props. 
 * @property {ActivityInfo[]} props.activities The list of activities for 'today'.
 * @property {string} props.date The date, formatted as 'MM/DD/YYYY'.
 */
class ActivityDay extends React.Component {
  /** @override */
  render() {
    const sortedActivities = Array.from(this.props.activities)
          .sort(activityFns.compareActivities);
    let date = new Date(this.props.date);
    return (
      <div className='activity-day'>
        <h4>{time.timestampToDateFormatted(date.getTime())}</h4>
        {sortedActivities.map((activity, index) => (
          <Activity activity={activity} key={index} className='activity'/>
        ))}
      </div>
    );
  }
}

export default ActivityDay;
