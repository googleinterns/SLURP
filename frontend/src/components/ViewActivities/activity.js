import React from 'react';
import App from '../Firebase';
import Card from 'react-bootstrap/Card';

/**
 * Activity component.
 */
const Activity = (props) => {
  return (
    <Card>
    <p>title: {props.activity["title"]}</p>
    </Card>
  );
};

export default Activity;
