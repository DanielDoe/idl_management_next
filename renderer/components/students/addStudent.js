import React from "react";
import StudentContext from "./student-context";
import {
  Form,
  Row,
  Col,
  Icon,
  Input,
  Button,
  Checkbox,
  Select,
  InputNumber,
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
class AddStudentForm extends React.Component {
  static contextType = StudentContext;

  constructor(props) {
    super(props);

    this.state = {
      counter: 1,
      programme: null,
      center:
        this.props.user.auth_status !== "admin" ? this.props.user.center : null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.editMode === false) {
          this.context.addStudentElements(values);
          // this.context.addstudentElements(values);
          // console.log('Added received values of form: ', values);
          this.handleReset();
          // this.props.onCancel()
        } else {
          this.context.updateStudentElements({
            student_id: this.props.fieldData.student_id,
            ...values,
          });
          // console.log('Updated received values of form: ', values);
          this.handleReset();
          this.props.onCancel();
        }
      }
    });
  };

  componentDidMount() {
    // To disabled submit button at the beginning and checks validations.
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    if (
      Object.keys(nextProps.fieldData).length !== 0 &&
      nextProps.editMode === true &&
      this.state.counter > 0
    ) {
      this.props.form.setFieldsValue({
        student_name: nextProps.fieldData.student_name,
        index_number: nextProps.fieldData.index_number,
        ref_number: nextProps.fieldData.ref_number,
        programme: nextProps.fieldData.programme,
      });
      this.setState({ counter: -1 });
    }
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  // reset form data when submitted
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({ counter: 1 });
  };

  handleChange(value) {
    this.setState({ semester: value });
  }

  renderCancel() {
    return this.props.editMode === false ? null : (
      <button
        type="button"
        style={{ margin: "0px auto", width: "100%" }}
        onClick={() => {
          this.props.onCancel();
          this.handleReset();
        }}
      >
        Cancel
      </button>
    );
  }

  renderCenterData = () => {
    const centers = this.context.centers.map((element, index) => {
      // console.log(element.name);
      return (
        <Option value={element.center_id} key={element.center_name + index}>
          {element.center_name}
        </Option>
      );
    });

    return centers;
  };

  renderProgramData = () => {
    const programmes = this.context.programmes
      .filter(element => element.center_id === this.state.center)
      .map((element, index) => {
        // console.log(element.name);
        return (
          <Option value={element.prog_cen_id} key={element.name + element.year}>
            {element.programme_name}
          </Option>
        );
      });

    return programmes;
  };

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
    const studentNameError =
      isFieldTouched("student_name") && getFieldError("student_name");
    const studentIndexError =
      isFieldTouched("index_number") && getFieldError("index_number");
    const studentRefError =
      isFieldTouched("ref_number") && getFieldError("ref_number");
    const studentProgrammeError =
      isFieldTouched("programme") && getFieldError("programme");
    const studentCenterError =
      isFieldTouched("center_id") && getFieldError("center_id");
    const studentEmailError = isFieldTouched("email") && getFieldError("email");

    // const othersError = getFieldError('otherSize');

    const studentName = getFieldValue("student_name");
    const studentEmail = getFieldValue("email");
    const studentIndex = getFieldValue("index_number");
    const studentRef = getFieldValue("ref_number");
    const studentProgramme = getFieldValue("programme");
    const centerID =
      this.context.user.auth_status !== "admin"
        ? this.context.user.center
        : getFieldValue("center_id");

    const isEmpty =
      !studentName ||
      !studentIndex ||
      !studentRef ||
      !studentEmail ||
      !studentProgramme ||
      !centerID;
    // || !studentCapacity;

    return (
      <Form onSubmit={this.handleSubmit} className="column new-student">
        <h2>{header} student </h2>
        <label htmlFor="new-teaching-name">Center</label>
        <FormItem
          // style={{ textAlign: "-webkit-teaching" }}
          hasFeedback
          // label="Username"
          validateStatus={studentCenterError ? "error" : ""}
          help={studentCenterError || ""}
        >
          {getFieldDecorator("center_id", {
            rules: [{ required: true, message: "enter center!" }],
            initialValue:
              this.context.user.auth_status !== "admin"
                ? this.context.user.center
                : null,
          })(
            <Select
              //   placeholder="eg. Accra"
              style={{ width: "100%" }}
              onChange={value => this.setState({ center: value })}
              disabled={
                this.context.user.auth_status !== "admin" ? true : false
              }
            >
              {this.renderCenterData()}
            </Select>
          )}
        </FormItem>
        <label htmlFor="new-student-name">Reference number</label>
        <FormItem
          style={{ textAlign: "-webkit-student" }}
          hasFeedback
          // label="Username"
          validateStatus={studentRefError ? "error" : ""}
          help={studentRefError || ""}
        >
          {getFieldDecorator("ref_number", {
            rules: [{ required: true, message: "enter reference number!" }],
          })(
            <InputNumber
              // onChange={}
              style={{ width: "100%" }}
              placeholder="e.g. 20376057"
            />
          )}
        </FormItem>
        <label htmlFor="new-student-std-cap">Index number</label>
        <FormItem
          // style={{textAlign: '-webkit-student'}}
          hasFeedback
          validateStatus={studentIndexError ? "error" : ""}
          help={studentIndexError || ""}
        >
          {getFieldDecorator("index_number", {
            rules: [
              {
                required: false,
                message: "code!",
              },
            ],
          })(
            <InputNumber
              style={{ width: "100%", marginRight: "0.5rem" }}
              placeholder="e.g. 2274314"
            />
          )}
        </FormItem>
        <label htmlFor="new-student-name">student name</label>
        <FormItem
          style={{ textAlign: "-webkit-student" }}
          hasFeedback
          // label="Username"
          validateStatus={studentNameError ? "error" : ""}
          help={studentNameError || ""}
        >
          {getFieldDecorator("student_name", {
            rules: [{ required: true, message: "enter student name!" }],
          })(<Input style={{ width: "100%" }} placeholder="e.g. John Doe" />)}
        </FormItem>
        <label htmlFor="new-student-name">student email</label>
        <FormItem
          style={{ textAlign: "-webkit-student" }}
          hasFeedback
          // label="Username"
          validateStatus={studentNameError ? "error" : ""}
          help={studentNameError || ""}
        >
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "enter student email!" }],
          })(
            <Input style={{ width: "100%" }} placeholder="e.g. johndoe@coe" />
          )}
        </FormItem>
        <label htmlFor="new-student-name">Programme</label>
        <FormItem
          style={{ textAlign: "-webkit-student" }}
          hasFeedback
          // label="Username"
          validateStatus={studentProgrammeError ? "error" : ""}
          help={studentProgrammeError || ""}
        >
          {getFieldDecorator("programme", {
            rules: [{ required: true, message: "enter programme!" }],
          })(
            <Select
              placeholder="Programme"
              className="exam-selector"
              onChange={e => this.setState({ programme: e })}
            >
              {this.renderProgramData()}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size={"large"}
            // className=""
            style={{ margin: "20px auto", width: "100%", backgroundColor: "" }}
            htmlType="submit"
            // disabled={this.hasErrors(getFieldsError()) || isEmpty}
          >
            {buttonText + " student"}
          </Button>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size={"large"}
            style={{ margin: "0px auto", width: "100%" }}
            onClick={() => {
              this.props.onListUpload(this.state.semester);
              this.handleReset();
            }}
            // onClick={() => {
            // 	this.props.onCancel();
            // 	this.handleReset();
            // }}
            disabled={!studentProgramme && !centerID}
          >
            Import
          </Button>
        </FormItem>
        {this.renderCancel()}
      </Form>
    );
  }
}

export const AddStudent = Form.create({ name: "normal_login" })(AddStudentForm);
