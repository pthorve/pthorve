import { matchPath } from 'react-router-dom';

export default function loadGetInitialProps(routes, req, res, store) {
  let routeMatchFound = false;
  const promises = routes.reduce((acc, route) => {
    const match = matchPath(req.url.split('?')[0], route);

    if (routeMatchFound || !match) {
      return acc;
    }

    routeMatchFound = true;

    const args = {
      req,
      res,
      match,
      store
    };

    if (route.component) {
      if (
        route.component.WrappedComponent &&
        route.component.WrappedComponent.getInitialProps
      ) {
        // for react-redux connect component
        acc.push(
          Promise.resolve(
            route.component.WrappedComponent.getInitialProps(args)
          )
        );
      }
    }
    return acc;
  }, []);
  return Promise.all(promises);
}
