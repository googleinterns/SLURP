import React from 'react';
import Card from 'react-bootstrap/Card';
import * as time from '../Utils/time.js';
import * as DBUTILS from '../../constants/database.js'
import '../../styles/activities.css';

class Activity extends React.Component {
  /** @inheritdoc */
  render() {
    const activity = this.props.activity;
    return (
      <Card className='activity'>
        <p>title: {activity[DBUTILS.ACTIVITIES_TITLE]}</p>
        <p>start time: {time.timestampToTimeFormatted(activity[DBUTILS.ACTIVITIES_START_TIME])} </p>
        <p>end time: {time.timestampToTimeFormatted(activity[DBUTILS.ACTIVITIES_END_TIME])} </p>
      </Card>
    );
  }
};

export default Activity;
