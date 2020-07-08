import React from 'react';
import Card from 'react-bootstrap/Card';
import * as utils from '../Utils/utils';
import * as DBUTILS from '../../constants/dbconstants'
import '../../styles/activities.css';

class Activity extends React.Component {
  
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = {activity: props.activity};
  }
  
  /** @inheritdoc */
  render() {
    return (
      <Card className="activity">
        <p>title: {this.state.activity[DBUTILS.ACTIVITIES_TITLE]}</p>
        <p>start time: {utils.timestampToTimeFormatted(this.state.activity[DBUTILS.ACTIVITIES_START_TIME])} </p>
        <p>end time: {utils.timestampToTimeFormatted(this.state.activity[DBUTILS.ACTIVITIES_END_TIME])} </p>
      </Card>
    );
  }
};

export default Activity;