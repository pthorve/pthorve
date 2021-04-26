import { createAPIActions, doRequest } from '../../services/api';

export const CATEGORIES_API = createAPIActions('content', 'categories');
export function fetchCategories() {
  return dispatch => {
    return dispatch(
      doRequest(CATEGORIES_API, {
        url: 'http://localhost:8888/api/categories'
      })
    );
  };
}

export const HOME_API = createAPIActions('content', 'home');
export function fetchHomeData() {
  return dispatch => {
    return dispatch(
      doRequest(HOME_API, {
        url: 'http://localhost:8888/api/home'
      })
    );
  };
}

export const LIST_API = createAPIActions('content', 'list');
export function fetchListData(id) {
  return dispatch => {
    return dispatch(
      doRequest(LIST_API, {
        url: `http://localhost:8888/api/playlist/${id}`
      })
    );
  };
}

export const VIDEO_API = createAPIActions('content', 'video');
export function fetchVideoData(id) {
  return dispatch => {
    return dispatch(
      doRequest(VIDEO_API, {
        url: `http://localhost:8888/api/video/${id}`
      })
    );
  };
}
