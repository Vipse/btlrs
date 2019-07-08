import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { actions as authActions } from 'redux/auth';

import './style.css'


class Login extends Component {
    
    handleSubmit = e => {
        const { actions } = this.props;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                actions.authenticateRequest(values);
            }
        });
    };

    

    render() {
        const { getFieldDecorator } = this.props.form;
        const { authenticated } = this.props;

        if (authenticated) {
            return <Redirect to="/" />;
        }
        
        return (
            <div className="login-form-wrapper">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="secondary-actions">
                            <a className="login-form-forgot" href="#">
                                Forgot password
                            </a>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({
    auth: {
      loginError,
      isLoginLoading,
      authenticated,
    },
  }) => ({
    loginError,
    isLoginLoading,
    authenticated,
  });
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      ...authActions,
    }, dispatch),
  });

  const LoginForm = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);