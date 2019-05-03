import React from "react";
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";
import CenterContext from './center-context';

const FormItem = Form.Item
const Option = Select.Option

class AddCentersForm extends React.Component {
  static contextType = CenterContext

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.addCenterElements(values);
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
    const centerNameError =
      isFieldTouched("name") && getFieldError("name");
    const centerCodeError =
      isFieldTouched("code") && getFieldError("code");
   

    const centerName = getFieldValue("name");
    const centerCode = getFieldValue("code");

    const isEmpty = !centerName || !centerCode ;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-center">
        <h2>Add center </h2>
        <label htmlFor="new-center-std-cap">Center name</label>
        <FormItem
          // style={{textAlign: '-webkit-center'}}
          hasFeedback
          validateStatus={centerNameError ? "error" : ""}
          help={centerNameError || ""}
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "center!",
              },
            ],
          })(
            <Input
              // min={1}
              // max={10}
              style={{ width: "100%", marginRight: "0.5rem" }}
              placeholder="e.g. Accra"
            />
          )}
        </FormItem>
        <label htmlFor="new-center-std-cap">Center code</label>
        <FormItem
          // style={{textAlign: '-webkit-center'}}
          hasFeedback
          validateStatus={centerCodeError ? "error" : ""}
          help={centerCodeError || ""}
        >
          {getFieldDecorator("code", {
            rules: [
              {
                required: true,
                message: "session amount!",
              },
            ],
          })(
            <Input
              // min={1}
              // max={1000}
              style={{ width: "100%", marginRight: "0.5rem" }}
              placeholder="e.g. ACC"
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
            disabled={this.hasErrors(getFieldsError()) && isEmpty}
          >
            Add center
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddCenters = Form.create({ name: "normal_login" })(AddCentersForm);
