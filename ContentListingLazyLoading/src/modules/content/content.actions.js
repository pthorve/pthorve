import { createAPIActions, doRequest } from '../../services/api';

export const CATEGORIES_API = createAPIActions('content', 'categories');

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

