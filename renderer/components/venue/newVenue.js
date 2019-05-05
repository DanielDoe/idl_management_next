import React from "react";
import VenueContext from "./venue-context";
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
class AddVenueForm extends React.Component {
  static contextType = VenueContext;

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.addVenueElements(values);
        console.log("Received values of form: ", values);
      }
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  renderCenterData = () => {
    const centers = this.context.centers.map((element, index) => {
      // console.log(element.name);
      return (
        <Option value={element.name} key={element.name}>
          {element.name}
        </Option>
      )
    })

    return centers
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      getFieldValue,
    } = this.props.form;
    
    const VenueCodeError = isFieldTouched("center") && getFieldError("center");
    const VenueNameError = isFieldTouched("name") && getFieldError("name");
    // const VenueYearError = isFieldTouched("year") && getFieldError("year");
    const VenueCapacityError =
      isFieldTouched("capacity") && getFieldError("capacity");
    // const othersError = getFieldError('otherSize');

    const VenueCode = getFieldValue("center");
    const VenueName = getFieldValue("name");
    // const VenueYear = getFieldValue("year");
    const VenueCapacity = getFieldValue("capacity");

    const isEmpty = !VenueName || !VenueCode || !VenueCapacity;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-venue">
        <h2>Add Venue </h2>
        <label htmlFor="new-venue-name">Center</label>
        <FormItem
          // style={{ textAlign: "-webkit-venue" }}
          hasFeedback
          // label="Username"
          validateStatus={VenueNameError ? "error" : ""}
          help={VenueNameError || ""}
        >
          {getFieldDecorator("center", {
            rules: [{ required: true, message: "enter name!" }],
          })(
            <Select placeholder="eg. Accra" style={{ width: '100%' }}>
              {this.renderCenterData()}
            </Select>
          )}
        </FormItem>
        <label htmlFor="new-venue-std-cap">Venue name</label>
        <FormItem
          // style={{textAlign: '-webkit-Venue'}}
          hasFeedback
          validateStatus={VenueCodeError ? "error" : ""}
          help={VenueCodeError || ""}
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "code!",
              },
            ],
          })(
            <Input
              style={{ width: "100%"}}
              placeholder="e.g. 50"
            />
          )}
        </FormItem>
        <label htmlFor="new-venue-std-cap">Capacity</label>
        <FormItem
          // style={{textAlign: '-webkit-Venue'}}
          hasFeedback
          validateStatus={VenueCapacityError ? "error" : ""}
          help={VenueCapacityError || ""}
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
            disabled={this.hasErrors(getFieldsError()) && isEmpty}
          >
            Add Venue
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddVenue = Form.create({ name: "venues" })(AddVenueForm);
