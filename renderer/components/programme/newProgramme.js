import React from "react";
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";

const FormItem = Form.Item
const Option = Select.Option

class AddProgramme extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
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
    const classNameError =
      isFieldTouched("session") && getFieldError("session");
    const classSizeError =
      isFieldTouched("snack_count") && getFieldError("snack_count");
    const examsError = isFieldTouched("amount") && getFieldError("amount");
    // const othersError = getFieldError('otherSize');

    const className = getFieldValue("session");
    const classSize = getFieldValue("snack_count");
    const examSize = getFieldValue("amount");

    const isEmpty = !className || !classSize || !examSize;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-programme">
        <h2>Add programme </h2>
        <label htmlFor="new-programme-name">Session</label>
        <FormItem
          style={{ textAlign: "-webkit-programme" }}
          hasFeedback
          // label="Username"
          validateStatus={classNameError ? "error" : ""}
          help={classNameError || ""}
        >
          {getFieldDecorator("session", {
            rules: [
              { required: true, type: "number", message: "enter session!" },
            ],
          })(
            <InputNumber
              min={1}
              max={10}
              style={{ width: "100%" }}
              placeholder="e.g. "
            />
          )}
        </FormItem>
        <label htmlFor="new-programme-std-cap">Snack</label>
        <FormItem
          // style={{textAlign: '-webkit-programme'}}
          hasFeedback
          validateStatus={classSizeError ? "error" : ""}
          help={classSizeError || ""}
        >
          {getFieldDecorator("snack_count", {
            rules: [
              {
                required: true,
                type: "number",
                message: "snack!",
              },
            ],
          })(
            <InputNumber
              min={1}
              max={10}
              style={{ width: "100%", marginRight: "0.5rem" }}
              placeholder="e.g. 50"
            />
          )}
        </FormItem>
        <label htmlFor="new-programme-std-cap">Amount</label>
        <FormItem
          // style={{textAlign: '-webkit-programme'}}
          hasFeedback
          validateStatus={examsError ? "error" : ""}
          help={examsError || ""}
        >
          {getFieldDecorator("amount", {
            rules: [
              {
                required: true,
                type: "number",
                message: "session amount!",
              },
            ],
          })(
            <InputNumber
              min={1}
              max={1000}
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
            disabled={this.hasErrors(getFieldsError()) && isEmpty}
          >
            Add programme
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddProgramme = Form.create({ name: "normal_login" })(AddProgramme);
