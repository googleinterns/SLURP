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

  return (
    <Row>
      <Col md={10} sm={9} xs={8}>
        <Nav
          variant="tabs"
          activeKey={props.tripView}
          defaultActiveKey={active}
        >
          <Nav.Item>
            <Nav.Link
              eventKey={active}
              onSelect={() => props.handleChangeView(active)}
            >
              Active
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey={pending}
              onSelect={() => props.handleChangeView(pending)}
            >
              Pending
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey={rejected}
              onSelect={() => props.handleChangeView(rejected)}
            >
              Rejected
            </Nav.Link>
          </Nav.Item>
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

