import React from 'react';
import Card from 'react-bootstrap/Card';
import * as utils from '../Utils/utils.js';
import * as DBUTILS from '../../constants/database.js'
import '../../styles/activities.css';

class Activity extends React.Component {
  /** @inheritdoc */
  render() {
    const activity = this.props.activity; // guaranteed to be defined.
    return (
      <Card className='activity'>
        <p>title: {activity[DBUTILS.ACTIVITIES_TITLE]}</p>
        <p>start time: {utils.timestampToTimeFormatted(activity[DBUTILS.ACTIVITIES_START_TIME])} </p>
        <p>end time: {utils.timestampToTimeFormatted(activity[DBUTILS.ACTIVITIES_END_TIME])} </p>
      </Card>
    );
  }
};

export default Activity;
