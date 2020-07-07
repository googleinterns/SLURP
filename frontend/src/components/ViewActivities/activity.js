import React from 'react';
import Card from 'react-bootstrap/Card';
import * as utils from '../Utils/utils';
import * as DBUTILS from '../../constants/dbconstants'

/**
 * 
 * @param {dictionary} props 
 */
const Activity = (props) => {
  return (
    <Card>
      <p>title: {props.activity[DBUTILS.ACTIVITIES_TITLE]}</p>
      <p>start time: {utils.timestampToTimeFormatted(props.activity[DBUTILS.ACTIVITIES_START_TIME])} </p>
      <p>end time: {utils.timestampToTimeFormatted(props.activity[DBUTILS.ACTIVITIES_END_TIME])} </p>
    </Card>
  );
};

export default Activity;
