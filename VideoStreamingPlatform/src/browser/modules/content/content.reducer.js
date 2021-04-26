import {
  HOME_API,
  LIST_API,
  VIDEO_API,
  CATEGORIES_API
} from './content.actions';

const initialState = {
  homeLoading: false,
  homeData: null,
  playlistLoading: false,
  playlistData: null,
  videoLoading: false,
  videoData: null,
  categories: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_API.REQUEST:
      return {
        ...state,
        homeLoading: true,
        homeData: null
      };
    case HOME_API.SUCCESS:
      return {
        ...state,
        homeLoading: false,
        homeData: action.data
      };
    case LIST_API.REQUEST:
      return {
        ...state,
        playlistLoading: true,
        playlistData: null
      };
    case LIST_API.SUCCESS:
      return {
        ...state,
        playlistLoading: false,
        playlistData: action.data
      };
    case VIDEO_API.REQUEST:
      return {
        ...state,
        videoLoading: true,
        videoData: null
      };
    case VIDEO_API.SUCCESS:
      return {
        ...state,
        videoLoading: false,
        videoData: action.data
      };
    case CATEGORIES_API.SUCCESS:
      return {
        ...state,
        categories: action.data
      };
    default:
      return state;
  }
};
