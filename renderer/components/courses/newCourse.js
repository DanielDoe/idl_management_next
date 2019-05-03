import React from "react";
import CourseContext from './Course-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";

const FormItem = Form.Item

class AddCourseForm extends React.Component {
  static contextType = CourseContext;

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.addCourseElements(values);
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
    const CourseNameError =
      isFieldTouched("name") && getFieldError("name");
    const CourseCodeError =
      isFieldTouched("code") && getFieldError("code");
    const CourseYearError = isFieldTouched("year") && getFieldError("year");
    const CourseCapacityError = isFieldTouched("capacity") && getFieldError("capacity");
    // const othersError = getFieldError('otherSize');

    const CourseName = getFieldValue("name");
    const CourseCode = getFieldValue("code");
    const CourseYear = getFieldValue("year");
    const CourseCapacity = getFieldValue("capacity");

    const isEmpty = !CourseName || !CourseCode || !CourseYear || !CourseCapacity;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-course">
        <h2>Add Course </h2>
        <label htmlFor="new-course-name">Programe name</label>
        <FormItem
          style={{ textAlign: "-webkit-course" }}
          hasFeedback
          // label="Username"
          validateStatus={CourseNameError ? "error" : ""}
          help={CourseNameError || ""}
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
        <label htmlFor="new-course-std-cap">Course code</label>
        <FormItem
          // style={{textAlign: '-webkit-Course'}}
          hasFeedback
          validateStatus={CourseCodeError ? "error" : ""}
          help={CourseCodeError || ""}
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
        <label htmlFor="new-course-name">Year group</label>
        <FormItem
          style={{ textAlign: "-webkit-Course" }}
          hasFeedback
          // label="Username"
          validateStatus={CourseYearError ? "error" : ""}
          help={CourseYearError || ""}
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
        <label htmlFor="new-course-std-cap">Capacity</label>
        <FormItem
          // style={{textAlign: '-webkit-Course'}}
          hasFeedback
          validateStatus={CourseCapacityError ? "error" : ""}
          help={CourseCapacityError || ""}
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
            Add Course
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddCourse = Form.create({ name: "normal_login" })(AddCourseForm);
