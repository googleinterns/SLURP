/**
 * Types of trip 'views' on the view trips page. Added for the trip invites feature.
 * @enum {number}
 */
const TripView = {
  /** Displays trips that current user has created or accepted. */
  ACTIVE: 0,
  /** Displays trips that current user has not yet accepted or rejected. */
  PENDING: 1,
  /** Displays trips that current user has rejected. */
  REJECTED: 2,
};

export default TripView;
