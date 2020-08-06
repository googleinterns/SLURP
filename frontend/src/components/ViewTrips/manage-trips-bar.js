import React from 'react';

import { Button, Row, Col, Nav } from 'react-bootstrap';

import TripView from '../../constants/trip-view.js';

/**
 * Component that contains the tabs to switch the trip view as well as the
 * add new trip button.
 *
 * @property {Object} props These are the props for this component:
 * @property {Function} props.handleAddTrip Event handler responsible for
 *     displaying the add trip modal.
 * @property {Function} props.handleChangeView Event handler responsible for
 *     updated the `tripView` state in `ViewTrips/index.js`.
 * @property {string} props.tripView The current user's trips page view.
 */
const ManageTripsBar = (props) => {
  const active = TripView.ACTIVE;
  const pending = TripView.PENDING;
  const rejected = TripView.REJECTED;

  /**
   * Returns a React Bootstrap `Nav.Item` to be placed in the `Nav` element
   * of the ManageTripsBar component.
   *
   * @param {string} innerText Inner text of the `Nav.Link` element.
   * @param {TripView} tripView The trip view associated with the `Nav.Item`.
   * @return {JSX.Element} `Nav.Item` element for trip view `Nav` bar.
   */
  function createTripViewNavItem(innerText, tripView) {
    return (
      <Nav.Item>
        <Nav.Link
          eventKey={tripView}
          onSelect={() => props.handleChangeView(tripView)}
        >
          {innerText}
        </Nav.Link>
      </Nav.Item>
    )
  }

  return (
    <Row>
      <Col md={10} sm={9} xs={8}>
        <Nav
          variant="tabs"
          activeKey={props.tripView}
          defaultActiveKey={active}
        >
          {createTripViewNavItem('Active', active)}
          {createTripViewNavItem('Pending', pending)}
          {createTripViewNavItem('Rejected', rejected)}
        </Nav>
      </Col>
      <Col md={2} sm={3} xs={4}>
        <Button type='button' onClick={props.handleAddTrip}>
          + New Trip
        </Button>
      </Col>
    </Row>
  );
}

export default ManageTripsBar;

