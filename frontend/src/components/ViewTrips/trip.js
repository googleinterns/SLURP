import React from 'react';

/**
 * Component corresponding to the container containing an individual trip.
 *
 * Temporarily, only the title and associated document ID are included in a
 * text element for each trip <div> element. This is done to simple test the
 * query functionality.
 *
 * TODO(Issue 17): Feed all the Trip Doc data to the UI.
 */
class Trip extends React.Component {
  render() {
    return (
      <div>
        <p>Title: {this.props.tripObj.name} | Doc Id: {this.props.tripId}</p>
      </div>
    );
  }
}

export default Trip;
