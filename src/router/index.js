import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from 'modules/Login';
import Main from 'modules/Main';
import { actions } from 'redux/auth';

import PrivateRoute from './PrivateRoute';


class AppRouter extends PureComponent {
    static propTypes = {
      auth: PropTypes.object.isRequired,
      isAuthenticated: PropTypes.func.isRequired,
    };

    componentDidMount() {
      this.props.isAuthenticated();
    }

    render() {
      const { authenticated, isAuthenticatedLoading } = this.props.auth;
      if (isAuthenticatedLoading) {
        return <span>Loading...</span>;
      }

      return (
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/main" component={Main} />
            {/* <PrivateRoute path="/" component={MainWrapper} authenticated={authenticated} /> */}
          </Switch>
        </Router>
      );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  isAuthenticated: actions.isAuthenticatedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
