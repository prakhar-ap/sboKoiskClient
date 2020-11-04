const APIKEY = 'AIzaSyCYId3AQwbdzHixE2-3rnONyZF5vWEBmMg'; // honey.moneykhandelwal
const APS_APIKEY = 'AIzaSyALbCAHZoY6pPr7tne-z9kbbOjWohcRO8c'; // apsoutlookdemo
const GEO_LOCATION_KEY = '7733a990-ebd4-11ea-b9a6-2955706ddbf3';
const local = {
    apiUrl: 'http://localhost:3000',
    apiKey: APS_APIKEY,
    geoLocationKey: GEO_LOCATION_KEY
};

const dev =  {
    apiUrl: '',
    apiKey: APS_APIKEY,
    geoLocationKey: GEO_LOCATION_KEY
};

const config = process.env.REACT_APP_ENV.trim() === "local"
    ? local
    : dev;

export default config;
