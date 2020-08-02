/**
 * This file specifies the database collection and field names.
 */
export const COLLECTION_TRIPS = 'trips';
export const TRIPS_TITLE = 'title';
export const TRIPS_DESCRIPTION = 'description';
export const TRIPS_DESTINATION = 'destination';
export const TRIPS_START_DATE = 'start_date';
export const TRIPS_END_DATE = 'end_date';
export const TRIPS_ACCEPTED_COLLABS = 'accepted_collaborator_uid_arr';
export const TRIPS_PENDING_COLLABS = 'pending_collaborator_uid_arr';
export const TRIPS_REJECTED_COLLABS = 'rejected_collaborator_uid_arr';
export const TRIPS_UPDATE_TIMESTAMP = 'update_timestamp';
/**
 * NOTE: The following constant corresponds to the collaborator field in
 * {@link_RawTripData} and is not a field in a trip document.
 */
export const RAW_TRIP_COLLABS = 'collaborator_email_arr';

export const COLLECTION_ACTIVITIES = 'activities';
export const ACTIVITIES_START_TIME = 'start_time';
export const ACTIVITIES_END_TIME = 'end_time';
export const ACTIVITIES_START_TZ = 'start_tz';
export const ACTIVITIES_END_TZ = 'end_tz';
export const ACTIVITIES_TITLE = 'title';
export const ACTIVITIES_DESCRIPTION = 'description';
export const ACTIVITIES_START_COUNTRY = 'start_country';
export const ACTIVITIES_END_COUNTRY = 'end_country';
