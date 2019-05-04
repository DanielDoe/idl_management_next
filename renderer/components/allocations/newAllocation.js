import React from "react";
import AllocationContext from './allocation-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";

const FormItem = Form.Item

class AddAllocationForm extends React.Component {
  static contextType = AllocationContext;

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.addAllocationElements(values);
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
    const AllocationNameError =
      isFieldTouched("name") && getFieldError("name");
    const AllocationCodeError =
      isFieldTouched("code") && getFieldError("code");
    const AllocationYearError = isFieldTouched("year") && getFieldError("year");
    const AllocationCapacityError = isFieldTouched("capacity") && getFieldError("capacity");
    // const othersError = getFieldError('otherSize');

    const AllocationName = getFieldValue("name");
    const AllocationCode = getFieldValue("code");
    const AllocationYear = getFieldValue("year");
    const AllocationCapacity = getFieldValue("capacity");

    const isEmpty = !AllocationName || !AllocationCode || !AllocationYear || !AllocationCapacity;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-allocation">
        <h2>Add Allocation </h2>
        <label htmlFor="new-allocation-name">Programme</label>
        <FormItem
          style={{ textAlign: "-webkit-allocation" }}
          hasFeedback
          // label="Username"
          validateStatus={AllocationNameError ? "error" : ""}
          help={AllocationNameError || ""}
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
        <label htmlFor="new-allocation-std-cap">Allocation code</label>
        <FormItem
          // style={{textAlign: '-webkit-Allocation'}}
          hasFeedback
          validateStatus={AllocationCodeError ? "error" : ""}
          help={AllocationCodeError || ""}
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
        <label htmlFor="new-allocation-name">Year group</label>
        <FormItem
          style={{ textAlign: "-webkit-allocation" }}
          hasFeedback
          // label="Username"
          validateStatus={AllocationYearError ? "error" : ""}
          help={AllocationYearError || ""}
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
        <label htmlFor="new-allocation-std-cap">Capacity</label>
        <FormItem
          // style={{textAlign: '-webkit-Allocation'}}
          hasFeedback
          validateStatus={AllocationCapacityError ? "error" : ""}
          help={AllocationCapacityError || ""}
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
            Add Allocation
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddAllocation = Form.create({ name: "normal_login" })(AddAllocationForm);
