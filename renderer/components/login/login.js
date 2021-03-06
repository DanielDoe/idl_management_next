import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { routeUserLogin } from "../_shared/axiosCalls";
import Logo from "../_shared/img/logof.png";
import Router from "next/router";
import swal from "sweetalert";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 1,
      year: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    let credentials = [];
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(routeUserLogin, {
            email: values.email,
            password: values.password,
          })
          .then(function(response) {
            // console.log(response);
            if (response.data.Statuscode == "200") {
              // console.log("Login unsuccessful..!")
              swal({
                title: "Good job!",
                text: "You are logged in successfully!",
                icon: "success",
                timer: 2000,
                button: false,
              });
              credentials = {
                ...response.data,
                email: values.email,
                password: values.password,
                remember: values.remember,
              };
              localStorage.removeItem("login");
              localStorage.setItem("login", JSON.stringify(credentials));
              // console.log('tokenObtained: ', JSON.parse(localStorage.getItem('credentials')));
              Router.push("/dashboard");
            } else {
              console.log("Login unsuccessful..!");
              swal({
                title: "Sorry!",
                text:
                  "We encountered an error logging you in please check your details or internet connection!",
                icon: "error",
                timer: 3000,
                button: false,
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  };

  componentDidMount() {
    // To disabled submit button at the beginning and checks validations.
    this.props.form.validateFields();
    // console.log(JSON.parse(localStorage.getItem('login')))
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      getFieldValue,
    } = this.props.form;
    const emailError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");

    const passwordField = getFieldValue("password");
    const emailField = getFieldValue("email");
    const isEmpty = !passwordField || !emailField;
    // const store = new Store();

    return (
      <div>
        <div style={{ textAlign: 'center'}}>
          <img className="logo-img" src={Logo} alt="idl-logo" />
        </div>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            validateStatus={emailError ? "error" : ""}
            help={emailError || ""}
          >
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }],
              initialValue:
                JSON.parse(localStorage.getItem("login")).remember === true
                  ? JSON.parse(localStorage.getItem("login")).email
                  : "Username",
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                // placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? "error" : ""}
            help={passwordError || ""}
          >
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
              ],
              initialValue:
                JSON.parse(localStorage.getItem("login")).remember === true
                  ? JSON.parse(localStorage.getItem("login")).password
                  : "Password",
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                // placeholder="Password"
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
              disabled={this.hasErrors(getFieldsError()) && isEmpty}
              className="login-form-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export const Login = Form.create({ name: "normal_login" })(LoginForm);
