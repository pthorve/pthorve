import 'isomorphic-fetch';

export function createAPIActions(prefix, suffix) {
  const PREFIX = prefix.toUpperCase();
  const SUFFIX = suffix.toUpperCase();
  return {
    REQUEST: `${PREFIX}/${SUFFIX}_REQUEST`,
    SUCCESS: `${PREFIX}/${SUFFIX}_SUCCESS`,
    FAILURE: `${PREFIX}/${SUFFIX}_FAILURE`
  };
}

export function doRequest(action, requestOptions = {}) {
  return async dispatch => {
    dispatch({
      type: action.REQUEST
    });

    const { url, ...options } = requestOptions;

    let response = null;
    try {
      response = await fetch(url, options);
    } catch (error) {
      response = error;
    }
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      dispatch({
        type: action.SUCCESS,
        data
      });
      return data;
    }

    dispatch({
      type: action.FAILURE,
      error: response
    });

    return response;
  };
}
