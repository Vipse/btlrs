import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as authActions } from 'redux/auth';

import Users from "modules/Users"
import Orders from "modules/Orders"
import Zones from "modules/Zones"

import './style.css'

class Main extends Component {
    state = {
        collapsed: false,
    };
    
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onLogout = () => {
        const { actions } = this.props;
        actions.logoutRequest();
    };

    render() {
        const { pathname } = this.props.location;
        
        if(pathname === "/") {
            return <Redirect to="/users"/>
        }
        return (
            <>
                <div className="header">
                    <Button type="primary" onClick={this.toggleCollapsed}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    <div>
                        <Link to="/profile">
                            <Button type="primary" title="Profile" className="profile-btn">
                                <Icon type="user" />
                            </Button>
                        </Link>
                        <Button type="primary" title="Log Out" onClick={this.onLogout}>
                            <Icon type="logout" />
                        </Button>
                    </div>
                    
                </div>
                <div className="main">
                    <div className="main-side-menu">
                        <Menu
                            defaultSelectedKeys={[pathname]}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            className="main-side-menu"
                        >
                            
                            <Menu.Item key="/users">
                                <Link to="/users">
                                    <Icon type="team" />
                                    <span>Users</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/orders">
                                <Link to="/orders">
                                    <Icon type="wallet" />
                                    <span>Orders</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/zones">
                                <Link to="/zones">
                                    <Icon type="inbox" />
                                    <span>Pickup zones</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/users" component={Users} />
                            <Route exact path="/orders" component={Orders} />
                            <Route exact path="/zones" component={Zones} />
                            <Route exact path="/profile" component={()=><div>profile</div>} />
                            <Route exact path="/user/:id" component={()=><div>User page</div>} />
                            <Route path="/" component={()=><Redirect to="/users"/>} />
                        </Switch>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = ({
    auth: {
      user,
    },
  }) => ({
    user,
  });
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      ...authActions,
    }, dispatch),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Main);
