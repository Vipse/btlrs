import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from 'modules/Login';
import Main from 'modules/Main';
import { actions } from 'redux/auth';

import PrivateRoute from './PrivateRoute';


class AppRouter extends PureComponent {
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
            <PrivateRoute exact path="/users" component={Main} authenticated={authenticated}  />
            <PrivateRoute exact path="/orders" component={Main} authenticated={authenticated}  />
            <PrivateRoute exact path="/profile" component={Main} authenticated={authenticated}  />
            <PrivateRoute exact path="/zones" component={Main} authenticated={authenticated} />
            <PrivateRoute exact path="/user/:id" component={Main} authenticated={authenticated} />
            <Route path="/" component={()=><Redirect to="/users"/>} />
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
