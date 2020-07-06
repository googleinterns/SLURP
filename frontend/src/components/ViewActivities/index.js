import React from 'react';
import App from '../Firebase';
import ActivityList from './activitylist';


/**
 * ViewActivities component.
 */
const ViewActivities = (props) => {
  return ( 
    <ActivityList tripId={props.match.params.tripId}/>
  );
};

export default ViewActivities;
