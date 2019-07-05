import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authenticated) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
