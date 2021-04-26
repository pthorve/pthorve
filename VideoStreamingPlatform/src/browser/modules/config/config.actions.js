import { createAPIActions, doRequest } from '../../services/api';

export const COUNTRIES_API = createAPIActions('config', 'countries');
export function fetchCountries() {
  return dispatch => {
    return dispatch(
      doRequest(COUNTRIES_API, {
        url: 'http://localhost:8888/api/countries'
      })
    );
  };
}

export const LOCATION_API = createAPIActions('config', 'location');
export function fetchLocationDetails() {
  return dispatch => {
    return dispatch(
      doRequest(LOCATION_API, {
        url: `http://localhost:8888/api/location`
      })
    );
  };
}

export const COUNTRY_CONFIG_API = createAPIActions('config', 'country');
export function fetchCountryConfig(country) {
  return dispatch => {
    return dispatch(
      doRequest(COUNTRY_CONFIG_API, {
        url: `http://localhost:8888/api/config/${country}`
      })
    );
  };
}
