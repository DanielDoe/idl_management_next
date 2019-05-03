import React from "react";
import UserContext from './user-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";

const FormItem = Form.Item

class AddUserForm extends React.Component {
  static contextType = UserContext;

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.addUserElements(values);
        console.log("Received values of form: ", values);
      }
    });
  };

  hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      getFieldValue,
    } = this.props.form;
    const UserNameError =
      isFieldTouched("name") && getFieldError("name");
    const UserCodeError =
      isFieldTouched("code") && getFieldError("code");
    const UserYearError = isFieldTouched("year") && getFieldError("year");
    const UserCapacityError = isFieldTouched("capacity") && getFieldError("capacity");
    // const othersError = getFieldError('otherSize');

    const UserName = getFieldValue("name");
    const UserCode = getFieldValue("code");
    const UserYear = getFieldValue("year");
    const UserCapacity = getFieldValue("capacity");

    const isEmpty = !UserName || !UserCode || !UserYear || !UserCapacity;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-user">
        <h2>Add User </h2>
        <label htmlFor="new-user-name">Email address</label>
        <FormItem
          style={{ textAlign: "-webkit-user" }}
          hasFeedback
          // label="Username"
          validateStatus={UserNameError ? "error" : ""}
          help={UserNameError || ""}
        >
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "enter name!" },
            ],
          })(
            <Input
              style={{ width: "100%" }}
              placeholder="e.g. "
            />
          )}
        </FormItem>
        <label htmlFor="new-user-std-cap">Password</label>
        <FormItem
          // style={{textAlign: '-webkit-User'}}
          hasFeedback
          validateStatus={UserCodeError ? "error" : ""}
          help={UserCodeError || ""}
        >
          {getFieldDecorator("code", {
            rules: [
              {
                required: true,
                message: "code!",
              },
            ],
          })(
            <Input
              style={{ width: "100%", marginRight: "0.5rem" }}
              placeholder="e.g. 50"
            />
          )}
        </FormItem>
        <label htmlFor="new-user-name">Center</label>
        <FormItem
          style={{ textAlign: "-webkit-User" }}
          hasFeedback
          // label="Username"
          validateStatus={UserYearError ? "error" : ""}
          help={UserYearError || ""}
        >
          {getFieldDecorator("year", {
            rules: [
              { required: true, message: "enter year group!" },
            ],
          })(
            <Input
              style={{ width: "100%" }}
              placeholder="e.g. "
            />
          )}
        </FormItem>
        <label htmlFor="new-user-std-cap">Status</label>
        <FormItem
          // style={{textAlign: '-webkit-User'}}
          hasFeedback
          validateStatus={UserCapacityError ? "error" : ""}
          help={UserCapacityError || ""}
        >
          {getFieldDecorator("capacity", {
            rules: [
              {
                required: true,
                type: "number",
                message: "name year!",
              },
            ],
          })(
            <InputNumber
              min={1}
              max={5000}
              style={{ width: "100%", marginRight: "0.5rem" }}
              placeholder="e.g. 50"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size={"large"}
            // className=""
            style={{ margin: "20px auto", width: "100%", backgroundColor: "" }}
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}
          >
            Add User
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddUser = Form.create({ name: "normal_login" })(AddUserForm);
