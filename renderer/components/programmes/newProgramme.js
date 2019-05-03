import React from "react";
import ProgrammeContext from './programme-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";

const FormItem = Form.Item

class AddProgrammeForm extends React.Component {
  static contextType = ProgrammeContext;

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.addProgrammeElements(values);
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
    const programmeNameError =
      isFieldTouched("name") && getFieldError("name");
    const programmeCodeError =
      isFieldTouched("code") && getFieldError("code");
    const programmeYearError = isFieldTouched("year") && getFieldError("year");
    const programmeCapacityError = isFieldTouched("capacity") && getFieldError("capacity");
    // const othersError = getFieldError('otherSize');

    const programmeName = getFieldValue("name");
    const programmeCode = getFieldValue("code");
    const programmeYear = getFieldValue("year");
    const programmeCapacity = getFieldValue("capacity");

    const isEmpty = !programmeName || !programmeCode || !programmeYear || !programmeCapacity;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-programme">
        <h2>Add programme </h2>
        <label htmlFor="new-programme-name">Programe name</label>
        <FormItem
          style={{ textAlign: "-webkit-programme" }}
          hasFeedback
          // label="Username"
          validateStatus={programmeNameError ? "error" : ""}
          help={programmeNameError || ""}
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
        <label htmlFor="new-programme-std-cap">Programme code</label>
        <FormItem
          // style={{textAlign: '-webkit-programme'}}
          hasFeedback
          validateStatus={programmeCodeError ? "error" : ""}
          help={programmeCodeError || ""}
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
        <label htmlFor="new-programme-name">Year group</label>
        <FormItem
          style={{ textAlign: "-webkit-programme" }}
          hasFeedback
          // label="Username"
          validateStatus={programmeYearError ? "error" : ""}
          help={programmeYearError || ""}
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
        <label htmlFor="new-programme-std-cap">Capacity</label>
        <FormItem
          // style={{textAlign: '-webkit-programme'}}
          hasFeedback
          validateStatus={programmeCapacityError ? "error" : ""}
          help={programmeCapacityError || ""}
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
            Add programme
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddProgramme = Form.create({ name: "normal_login" })(AddProgrammeForm);
