import React from "react";
import ExamContext from ".//exams-context";
import { Form, Button, Select, Row, Col, DatePicker } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
}

function onOk(value) {
  console.log("onOk: ", value);
}

class AddExamForm extends React.Component {
  static contextType = ExamContext;
  constructor(props) {
    super(props);

    this.state = {
      counter: 1,
      // center: this.props.user.auth_status !== 'admin' ? this.props.user.center : null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.context.addExamElements(values);
        // console.log("Added received values of form: ", values);
        //   this.handleReset();
        // this.props.onCancel()
      }
    });
  };

  componentDidMount() {
    // To disabled submit button at the beginning and checks validations.
    this.props.form.validateFields();
    // this.setState({
    // 	center: this.context.user.auth_status !== 'admin' ? this.context.user.center : null,
    // });
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const header = this.props.editMode ? "Edit" : "New";
    const buttonText = this.props.editMode ? "Edit" : "Add";
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      getFieldValue,
    } = this.props.form;

    const examTypeError = isFieldTouched("type") && getFieldError("type");
    const examSemesterError =
      isFieldTouched("semester") && getFieldError("semester");
    // const VenueYearError = isFieldTouched("year") && getFieldError("year");
    const startError = isFieldTouched("start") && getFieldError("start");
    const endError = isFieldTouched("end") && getFieldError("end");
    // const othersError = getFieldError('otherSize');

    const examType = getFieldValue("type");
    const examSemester = getFieldValue("semester");
    // const VenueYear = getFieldValue("year");
    const start = getFieldValue("start");
    const end = getFieldValue("end");

    const isEmpty = !examType || !examSemester || !start || !end;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-exams">
        <h2>{header} timetable </h2>
        <label htmlFor="new-teaching-name">Exams type</label>
        <FormItem
          // style={{ textAlign: "-webkit-teaching" }}
          hasFeedback
          // label="Username"
          validateStatus={examTypeError ? "error" : ""}
          help={examTypeError || ""}
        >
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "enter center!" }],
          })(
            <Select
              //   placeholder="eg. Accra"
              style={{ width: "100%" }}
              // onChange={value => this.setState({ center: value })}
            >
              <Option value="End of Semester">End of Semester</Option>
              <Option value="Mid Semester">Mid Semester</Option>
            </Select>
          )}
        </FormItem>
        <label htmlFor="new-teaching-std-cap">Semester</label>
        <FormItem
          // style={{textAlign: '-webkit-teaching'}}
          hasFeedback
          validateStatus={examSemesterError ? "error" : ""}
          help={examSemesterError || ""}
        >
          {getFieldDecorator("semester", {
            rules: [
              {
                required: true,
                message: "semester!",
              },
            ],
          })(
            <Select
              placeholder="e.g. 1"
              className="exam-selector"
              //   onChange={e => setsemester(e)}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          )}
        </FormItem>
        <label htmlFor="new-teaching-std-cap">Start</label>
        <FormItem
          // style={{textAlign: '-webkit-teaching'}}
          hasFeedback
          validateStatus={startError ? "error" : ""}
          help={startError || ""}
        >
          {getFieldDecorator("start", {
            rules: [
              {
                required: true,
                message: "semester!",
              },
            ],
          })(
            <DatePicker
              style={{ width: "100%" }}
              showTime
              placeholder="Select Time"
              onChange={onChange}
              onOk={onOk}
            />
          )}
        </FormItem>
        <label htmlFor="new-teaching-std-cap">End</label>
        <FormItem
          // style={{textAlign: '-webkit-teaching'}}
          hasFeedback
          validateStatus={endError ? "error" : ""}
          help={endError || ""}
        >
          {getFieldDecorator("end", {
            rules: [
              {
                required: true,
                message: "semester!",
              },
            ],
          })(
            <DatePicker
              style={{ width: "100%" }}
              showTime
              placeholder="Select Time"
              onChange={onChange}
              onOk={onOk}
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
            disabled={this.hasErrors(getFieldsError()) || isEmpty}
          >
            {buttonText + " timetable"}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddExam = Form.create({ name: "teaching" })(AddExamForm);
