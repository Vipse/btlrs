import React, { Component } from 'react'
import { Modal } from 'antd';
import { Form, Icon, Input } from 'antd';


class ZoneModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultValues: {}
        }
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.props.onCancel()
    }
    handleSubmit = () => {
        const { defaultValues } = this.props;

        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.props.onOk({
                    ...defaultValues,
                    ...values
                });
                this.props.form.resetFields()
            }
        })
    }


    
    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;

        
        return (
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input address!' }],
                            initialValue: this.props.defaultValues.address
                        })(
                            <Input
                                placeholder="Address"
                                
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('GPS', {
                            rules: [{ required: true, message: 'Please input coordinates!' }],
                            initialValue: this.props.defaultValues.GPS
                        })(
                            <Input
                                placeholder="GPS"
                            />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const ZoneModalForm = Form.create()(ZoneModal)

export default ZoneModalForm