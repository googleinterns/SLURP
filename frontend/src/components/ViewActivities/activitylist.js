import React from 'react';
import * as activityFns from './activityfns.js';
import ActivityDay from './activityday.js';
import '../../styles/activities.css';
import * as DB from '../../constants/database.js';
import app from '../Firebase';

const db = app.firestore();


/**
 * Gets the list of activities from the server. 
 * 
 * @param {string} tripId The trip ID.
 */
export async function getActivityList(tripId) {
  return new Promise(function(resolve, reject) {
    let tripActivities = [];
    
    db.collection(DB.COLLECTION_TRIPS).doc(tripId)
    .collection(DB.COLLECTION_ACTIVITIES).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data['id'] = doc.id;
        
        // TODO: if start date != end date, split into 2 days. (#37)

        // Eliminate nanoseconds, convert to milliseconds.
        data[DB.ACTIVITIES_START_TIME] =
          data[DB.ACTIVITIES_START_TIME]['seconds'] * 1000;         
        data[DB.ACTIVITIES_END_TIME] = 
          data[DB.ACTIVITIES_END_TIME]['seconds'] * 1000;

        tripActivities.push(data);
      })
    }).catch(error => {
      console.log("It seems that an error has occured.");
      tripActivities = null;
    }).then( () => resolve(tripActivities) );
  })
}

/**
 * The list of activities. 
 * 
 * @param {Object} props This component expects the following props:
 * - `tripId` {string} The trip's ID.  
 */
class ActivityList extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = { days : [] };
  }

  /** 
   * @inheritdoc
   * 
   * Get sorted list of activities from the database. 
   * 
   * This function only queries the database if `this.state` is defined.
   * `this.state` gains an entry with key `days` with the list of activities 
   * sorted by date. 
   * 
   * This function also expects `this.props.tripId` to exist.
   */
  async componentDidMount() {
    if (this.state === null || this.props.tripId === null) { return; }
    let tripActivities = await getActivityList(this.props.tripId);
    if (tripActivities === null) {
      this.setState({days: null});  
      return;
    } 
    this.setState({days: activityFns.sortByDate(tripActivities)});
  }

  /** @inheritdoc */
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
