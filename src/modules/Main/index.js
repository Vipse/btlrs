import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd';

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


    render() {
        return (
            <>
                <div className="header">
                    <Button type="primary" onClick={this.toggleCollapsed}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    <Button type="primary" title="Log Out">
                        <Icon type="logout" />
                    </Button>
                </div>
                <div className="main-side-menu">
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                        className="main-side-menu"
                    >
                        <Menu.Item key="1">
                            <Icon type="team" />
                            <span>Users</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="wallet" />
                            <span>Orders</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="user" />
                            <span>Profile</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="inbox" />
                            <span>Pickup zones</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </>
        )
    }
}

export default Main;