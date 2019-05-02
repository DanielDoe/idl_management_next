import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Head from "next/head";
import Link from "next/link";

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{ float: "right" }}
            className="login-form-button"
          >
            <Link href='/dashboard'><a>Login</a></Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const Login = Form.create({ name: "normal_login" })(LoginForm);
