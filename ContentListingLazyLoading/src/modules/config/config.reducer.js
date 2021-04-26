import {
  LOCATION_API,
  COUNTRIES_API,
  COUNTRY_CONFIG_API
} from './config.actions';

const initialState = {
  location: null,
  countries: null,
  config: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_API.SUCCESS:
      return {
        ...state,
        location: action.data
      };
    case COUNTRIES_API.SUCCESS:
      return {
        ...state,
        countries: action.data
      };
    case COUNTRY_CONFIG_API.SUCCESS:
      return {
        ...state,
        config: action.data
      };
    default:
      return state;
  }
};
