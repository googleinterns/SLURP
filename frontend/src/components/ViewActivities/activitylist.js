import React from 'react';
import { useParams } from 'react-router-dom';
import app from '../Firebase';

import * as DBFIELDS from '../../constants/dbconstants'
import ActivityDay from './activityday';

const db = app.firestore();

/**
 * Gets the list of activities from the server. 
 * @param {string} tripId The trip ID.
 */
async function getActivityList(tripId) {
  return new Promise(function(resolve, reject) {
    let tripActivities = [];
    
    db.collection(DBFIELDS.COLLECTION_TRIPS).doc(tripId)
    .collection(DBFIELDS.COLLECTION_ACTIVITIES).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data['id'] = doc.id;
        
        // TODO: if start date != end date, split into 2 days. (#37)

        // Eliminate nanoseconds, convert to milliseconds.
        data[DBFIELDS.ACTIVITIES_START_TIME] =
          data[DBFIELDS.ACTIVITIES_START_TIME]["seconds"] * 1000;         
        data[DBFIELDS.ACTIVITIES_END_TIME] = 
          data[DBFIELDS.ACTIVITIES_END_TIME]["seconds"] * 1000;

        tripActivities.push(data);
      })
    }).catch(error => {
      tripActivities = null;
    }).then( () => resolve(tripActivities) );
  })
}

/**
 * Sort a list of trip activities by date. 
 * @param {Array} tripActivities Array of activities.
 * @returns Dictionary of trip activities in the form {"MM/DD/YYYY": [activities on that day], ...}.
 */
function sortByDate(tripActivities) {
  let activities = new Map(); // { MM/DD/YYYY: [activities] }.
  for (let activity of tripActivities) {
    const activityDate = new Date(activity[DBFIELDS.ACTIVITIES_START_TIME]);
    const dateKey = activityDate.toLocaleDateString()
    if (activities.has(dateKey)) {
      activities.get(dateKey).add(activity);
    } else {
      activities.set(dateKey, new Set([activity]));
    }
  }

  let activitiesSorted = Array.from(activities).sort(function (a, b) {
    const adate = new Date(a[0]);
    const bdate = new Date(b[0]);
    return adate > bdate ? 1 : adate < bdate ? -1 : 0;
  });
  return activitiesSorted;
}

class ActivityList extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = { days : [], tripId: props.tripId };
  }

  async componentDidMount() {
    let tripActivities = await getActivityList(this.state.tripId);
    if (tripActivities === null) {
      this.setState({days: null});  
      return;
    } 
    this.setState({days: sortByDate(tripActivities)});
  }

  render() {
    console.log(this.state.days);
    if (this.state.days === null) {
      return (<p>An error has occurred :(</p> );
    } else if (this.state.days.length == 0) {
      return (<p>Plan your trip here!</p>);
    }
    return (
      <div>
        {this.state.days.map((item, index) => (
          <ActivityDay date={item[0]} activities={item[1]} />
        ))}
      </div>
    );
  }
}

export default ActivityList;
