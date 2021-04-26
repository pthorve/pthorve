import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { getRoutes } from './routes';

import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        {getRoutes().map(route => (
          <Route key={route.key} {...route} />
        ))}
      </Switch>
    </>
  );
};
export default App;
