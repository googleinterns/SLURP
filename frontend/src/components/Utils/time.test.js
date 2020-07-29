import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import * as utils from './time.js';

const TZ_CHICAGO = 'America/Chicago';
const TZ_SINGAPORE = 'Asia/Singapore';

const ALLTZS = ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis Ababa', 'Africa/Algiers', 'Africa/Asmara', 'Africa/Asmera', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar es Salaam', 'Africa/Djibouti', 'Africa/Douala', 'Africa/El Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao Tome', 'Africa/Timbuktu', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek', 'America/Adak', 'America/Anchorage', 'America/Anguilla', 'America/Antigua', 'America/Araguaina', 'America/Argentina/Buenos Aires', 'America/Argentina/Catamarca', 'America/Argentina/ComodRivadavia', 'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio Gallegos', 'America/Argentina/Salta', 'America/Argentina/San Juan', 'America/Argentina/San Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia', 'America/Aruba', 'America/Asuncion', 'America/Atikokan', 'America/Atka', 'America/Bahia', 'America/Bahia Banderas', 'America/Barbados', 'America/Belem', 'America/Belize', 'America/Blanc-Sablon', 'America/Boa Vista', 'America/Bogota', 'America/Boise', 'America/Buenos Aires', 'America/Cambridge Bay', 'America/Campo Grande', 'America/Cancun', 'America/Caracas', 'America/Catamarca', 'America/Cayenne', 'America/Cayman', 'America/Chicago', 'America/Chihuahua', 'America/Coral Harbour', 'America/Cordoba', 'America/Costa Rica', 'America/Creston', 'America/Cuiaba', 'America/Curacao', 'America/Danmarkshavn', 'America/Dawson', 'America/Dawson Creek', 'America/Denver', 'America/Detroit', 'America/Dominica', 'America/Edmonton', 'America/Eirunepe', 'America/El Salvador', 'America/Ensenada', 'America/Fort Nelson', 'America/Fort Wayne', 'America/Fortaleza', 'America/Glace Bay', 'America/Godthab', 'America/Goose Bay', 'America/Grand Turk', 'America/Grenada', 'America/Guadeloupe', 'America/Guatemala', 'America/Guayaquil', 'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indianapolis', 'America/Inuvik', 'America/Iqaluit', 'America/Jamaica', 'America/Jujuy', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Knox IN', 'America/Kralendijk', 'America/La Paz', 'America/Lima', 'America/Los Angeles', 'America/Louisville', 'America/Lower Princes', 'America/Maceio', 'America/Managua', 'America/Manaus', 'America/Marigot', 'America/Martinique', 'America/Matamoros', 'America/Mazatlan', 'America/Mendoza', 'America/Menominee', 'America/Merida', 'America/Metlakatla', 'America/Mexico City', 'America/Miquelon', 'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Montreal', 'America/Montserrat', 'America/Nassau', 'America/New York', 'America/Nipigon', 'America/Nome', 'America/Noronha', 'America/North Dakota/Beulah', 'America/North Dakota/Center', 'America/North Dakota/New Salem', 'America/Nuuk', 'America/Ojinaga', 'America/Panama', 'America/Pangnirtung', 'America/Paramaribo', 'America/Phoenix', 'America/Port-au-Prince', 'America/Port of Spain', 'America/Porto Acre', 'America/Porto Velho', 'America/Puerto Rico', 'America/Punta Arenas', 'America/Rainy River', 'America/Rankin Inlet', 'America/Recife', 'America/Regina', 'America/Resolute', 'America/Rio Branco', 'America/Rosario', 'America/Santa Isabel', 'America/Santarem', 'America/Santiago', 'America/Santo Domingo', 'America/Sao Paulo', 'America/Scoresbysund', 'America/Shiprock', 'America/Sitka', 'America/St Barthelemy', 'America/St Johns', 'America/St Kitts', 'America/St Lucia', 'America/St Thomas', 'America/St Vincent', 'America/Swift Current', 'America/Tegucigalpa', 'America/Thule', 'America/Thunder Bay', 'America/Tijuana', 'America/Toronto', 'America/Tortola', 'America/Vancouver', 'America/Virgin', 'America/Whitehorse', 'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Macquarie', 'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/South Pole', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'Arctic/Longyearbyen', 'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Ashkhabad', 'Asia/Atyrau', 'Asia/Baghdad', 'Asia/Bahrain', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Calcutta', 'Asia/Chita', 'Asia/Choibalsan', 'Asia/Chongqing', 'Asia/Chungking', 'Asia/Colombo', 'Asia/Dacca', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Harbin', 'Asia/Hebron', 'Asia/Ho Chi Minh', 'Asia/Hong Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Istanbul', 'Asia/Jakarta', 'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kashgar', 'Asia/Kathmandu', 'Asia/Katmandu', 'Asia/Khandyga', 'Asia/Kolkata', 'Asia/Krasnoyarsk', 'Asia/Kuala Lumpur', 'Asia/Kuching', 'Asia/Kuwait', 'Asia/Macao', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila', 'Asia/Muscat', 'Asia/Nicosia', 'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom Penh', 'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qostanay', 'Asia/Qyzylorda', 'Asia/Rangoon', 'Asia/Riyadh', 'Asia/Saigon', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Tel Aviv', 'Asia/Thimbu', 'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ujung Pandang', 'Asia/Ulaanbaatar', 'Asia/Ulan Bator', 'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vientiane', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yangon', 'Asia/Yekaterinburg', 'Asia/Yerevan', 'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape Verde', 'Atlantic/Faeroe', 'Atlantic/Faroe', 'Atlantic/Jan Mayen', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South Georgia', 'Atlantic/St Helena', 'Atlantic/Stanley', 'Australia/ACT', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken Hill', 'Australia/Canberra', 'Australia/Currie', 'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/LHI', 'Australia/Lindeman', 'Australia/Lord Howe', 'Australia/Melbourne', 'Australia/NSW', 'Australia/North', 'Australia/Perth', 'Australia/Queensland', 'Australia/South', 'Australia/Sydney', 'Australia/Tasmania', 'Australia/Victoria', 'Australia/West', 'Australia/Yancowinna', 'Brazil/Acre', 'Brazil/DeNoronha', 'Brazil/East', 'Brazil/West', 'CET', 'CST6CDT', 'Canada/Atlantic', 'Canada/Central', 'Canada/Eastern', 'Canada/Mountain', 'Canada/Newfoundland', 'Canada/Pacific', 'Canada/Saskatchewan', 'Canada/Yukon', 'Chile/Continental', 'Chile/EasterIsland', 'Cuba', 'EET', 'EST', 'EST5EDT', 'Egypt', 'Eire', 'Etc/GMT', 'Etc/GMT+0', 'Etc/GMT+1', 'Etc/GMT+10', 'Etc/GMT+11', 'Etc/GMT+12', 'Etc/GMT+2', 'Etc/GMT+3', 'Etc/GMT+4', 'Etc/GMT+5', 'Etc/GMT+6', 'Etc/GMT+7', 'Etc/GMT+8', 'Etc/GMT+9', 'Etc/GMT-0', 'Etc/GMT-1', 'Etc/GMT-10', 'Etc/GMT-11', 'Etc/GMT-12', 'Etc/GMT-13', 'Etc/GMT-14', 'Etc/GMT-2', 'Etc/GMT-3', 'Etc/GMT-4', 'Etc/GMT-5', 'Etc/GMT-6', 'Etc/GMT-7', 'Etc/GMT-8', 'Etc/GMT-9', 'Etc/GMT0', 'Etc/Greenwich', 'Etc/UCT', 'Etc/UTC', 'Etc/Universal', 'Etc/Zulu', 'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belfast', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Busingen', 'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Helsinki', 'Europe/Isle of Man', 'Europe/Istanbul', 'Europe/Jersey', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon', 'Europe/Ljubljana', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow', 'Europe/Nicosia', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica', 'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara', 'Europe/San Marino', 'Europe/Sarajevo', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Skopje', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Tiraspol', 'Europe/Ulyanovsk', 'Europe/Uzhgorod', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich', 'GB', 'GB-Eire', 'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'HST', 'Hongkong', 'Iceland', 'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos', 'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe', 'Indian/Maldives', 'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion', 'Iran', 'Israel', 'Jamaica', 'Japan', 'Kwajalein', 'Libya', 'MET', 'MST', 'MST7MDT', 'Mexico/BajaNorte', 'Mexico/BajaSur', 'Mexico/General', 'NZ', 'NZ-CHAT', 'Navajo', 'PRC', 'PST8PDT', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville', 'Pacific/Chatham', 'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury', 'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Johnston', 'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas', 'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Ponape', 'Pacific/Port Moresby', 'Pacific/Rarotonga', 'Pacific/Saipan', 'Pacific/Samoa', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Truk', 'Pacific/Wake', 'Pacific/Wallis', 'Pacific/Yap', 'Poland', 'Portugal', 'ROC', 'ROK', 'Singapore', 'Turkey', 'UCT', 'US/Alaska', 'US/Aleutian', 'US/Arizona', 'US/Central', 'US/East-Indiana', 'US/Eastern', 'US/Hawaii', 'US/Indiana-Starke', 'US/Michigan', 'US/Mountain', 'US/Pacific', 'US/Pacific-New', 'US/Samoa', 'UTC', 'Universal', 'W-SU', 'WET', 'Zulu'];
const USTZS =  ['America/New York', 'America/Detroit', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Indiana/Indianapolis', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/Chicago', 'America/Indiana/Tell City', 'America/Indiana/Knox', 'America/Menominee', 'America/North Dakota/Center', 'America/North Dakota/New Salem', 'America/North Dakota/Beulah', 'America/Denver', 'America/Boise', 'America/Phoenix', 'America/Los Angeles', 'America/Anchorage', 'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat', 'America/Nome', 'America/Adak', 'Pacific/Honolulu'];

test('new york date timestamp format', () => {
 // Month parameter is zero indexed so it's actually the 10th month.
 const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
 const expected = 'Saturday, October 3, 2020';
 const actual = utils.timestampToDateFormatted(testDate);
 expect(actual).toEqual(expected);
});

test('other date timestamp format', () => {
 const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
 const expectedCentral = 'Saturday, August 22, 2020';
 const expectedSingapore = 'Sunday, August 23, 2020';
 const actualCentral = utils.timestampToDateFormatted(testDate, TZ_CHICAGO);
 const actualSingapore = utils.timestampToDateFormatted(testDate, TZ_SINGAPORE);
 expect(actualCentral).toEqual(expectedCentral);
 expect(actualSingapore).toEqual(expectedSingapore);
});

test('new york time timestamp format', () => {
 // Month parameter is zero indexed so it's actually the 10th month.
 const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
 const expected = '10:19 AM';
 const actual = utils.timestampToTimeFormatted(testDate);
 expect(actual).toEqual(expected);
});

test('other time timestamp format', () => {
 const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
 const expectedCentral = '9:03 PM';
 const expectedSingapore = '10:03 AM';
 const actualCentral = utils.timestampToTimeFormatted(testDate, TZ_CHICAGO);
 const actualSingapore = utils.timestampToTimeFormatted(testDate, TZ_SINGAPORE);
 expect(actualCentral).toEqual(expectedCentral);
 expect(actualSingapore).toEqual(expectedSingapore);
});

test('new york full timestamp format', () => {
 // Month parameter is zero indexed so it's actually the 10th month.
 const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
 const expected = 'Saturday, October 3, 2020, 10:19 AM';
 const actual = utils.timestampToFormatted(testDate);
 expect(actual).toEqual(expected);
});

test('other full timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = 'Saturday, August 22, 2020, 9:03 PM';
  const expectedSingapore = 'Sunday, August 23, 2020, 10:03 AM';
  const actualCentral = utils.timestampToFormatted(testDate, TZ_CHICAGO);
  const actualSingapore = utils.timestampToFormatted(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

test('legit country no spaces', () => {
  const actual = utils.timezonesForCountry('China');
  const expected = ['Asia/Shanghai', 'Asia/Urumqi'];
  expect(new Set(actual.sort())).toEqual(new Set(expected.sort()));
})

test('legit country, yes spaces', () => {
  const actual = utils.timezonesForCountry('United States of America');
  expect(new Set(actual)).toEqual(new Set(USTZS));
});

test('not legit country (spaces and non spaces)', () => {
  const actual = utils.timezonesForCountry('MURICA');
  expect(new Set(actual)).toEqual(new Set(ALLTZS));
 });

test('new york date ISODate format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = '2020-10-03';
  const actual = utils.getISODate(testDate);
  expect(actual).toEqual(expected);
});

test('other date ISODate format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = '2020-08-22';
  const expectedSingapore = '2020-08-23';
  const actualCentral = utils.getISODate(testDate, TZ_CHICAGO);
  const actualSingapore = utils.getISODate(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
});

test('24h empty input tests', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expected = '02:03';
  expect(utils.get24hTime(testDate, '')).toBe(expected);
  expect(utils.get24hTime(testDate, null)).toBe(expected);
});

test('UTC time 24h format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = '14:19';
  const actual = utils.get24hTime(testDate);
  expect(actual).toEqual(expected);
});

test('other time 24h format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = '21:03';
  const expectedSingapore = '10:03';
  const actualCentral = utils.get24hTime(testDate, TZ_CHICAGO);
  const actualSingapore = utils.get24hTime(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
});

test('ISODate empty input tests', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expected = '2020-08-23';
  expect(utils.getISODate(testDate, '')).toBe(expected);
  expect(utils.getISODate(testDate, null)).toBe(expected);
});

const mockTimeNow = 0;
jest.mock('firebase/app', () => ({
    firestore: {
      Timestamp: {
          now: () => mockTimeNow,
          fromDate: (date) => date,
      }
    }
}));
describe('getTimeStampFromDateString tests', () => {
  test('No date entered in form', () => {
    const expectedTimestamp = mockTimeNow;
    const testRawDate = '';

    const testTimestamp = utils.getTimestampFromDateString(testRawDate);

    expect(testTimestamp).toEqual(expectedTimestamp);
  });

  test('Date entered in form', () => {
    const testDate = new Date(2020, 5, 4); // July 4, 2020
    const expectedTimestamp = firebase.firestore.Timestamp.fromDate(testDate);

    // This is the type of string (yyyy-mm-dd) that is returned from the form
    // input type 'date'.
    const testRawDate = testDate.toISOString().substring(0,10);
    const testTimestamp = utils.getTimestampFromDateString(testRawDate);

    expect(testTimestamp).toEqual(expectedTimestamp);
  });
});
