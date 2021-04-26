import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import content from './content/content.reducer';
import config from './config/config.reducer';

export default function(history) {
  return combineReducers({
    content,
    config,
    router: connectRouter(history)
  });
}
