import React from 'react';
import CourseContext from './Course-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;

class AddCourseForm extends React.Component {
	static contextType = CourseContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.props.editMode === false) {
					// this.context.addVenueElements(values);
					console.log('Added received values of form: ', values);
					this.handleReset();
					// this.props.onCancel()
				} else {
					// this.context.updateVenueElements(values);
					console.log('Updated received values of form: ', values);
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
		if (Object.keys(nextProps.fieldData).length !== 0 && nextProps.editMode === true && this.state.counter > 0) {
			this.props.form.setFieldsValue({
				title: nextProps.fieldData.title,
				code: nextProps.fieldData.code,
				semester: nextProps.fieldData.semester,
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

	renderCancel() {
		return this.props.editMode === false ? null : (
			<button
				type="button"
				style={{ margin: '0px auto', width: '100%' }}
				onClick={() => {
					this.props.onCancel();
					this.handleReset();
				}}
			>
				Cancel
			</button>
		);
	}

	render() {
		const header = this.props.editMode ? 'Edit' : 'New';
		const buttonText = this.props.editMode ? 'Edit' : 'Add';
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const CourseNameError = isFieldTouched('title') && getFieldError('title');
		const CourseCodeError = isFieldTouched('code') && getFieldError('code');
		const CourseYearError = isFieldTouched('semester') && getFieldError('semester');
		const CourseCapacityError = isFieldTouched('programme') && getFieldError('programme');
		// const othersError = getFieldError('otherSize');

		const CourseName = getFieldValue('title');
		const CourseCode = getFieldValue('code');
		const CourseYear = getFieldValue('semester');
		const CourseCapacity = getFieldValue('programme');

		const isEmpty = !CourseName || !CourseCode || !CourseYear || !CourseCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-course">
				<h2>{header} Course </h2>
				<label htmlFor="new-course-name">Course title</label>
				<FormItem
					style={{ textAlign: '-webkit-course' }}
					hasFeedback
					// label="Username"
					validateStatus={CourseNameError ? 'error' : ''}
					help={CourseNameError || ''}
				>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'enter title!' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. Algebra" />)}
				</FormItem>
				<label htmlFor="new-course-std-cap">Course code</label>
				<FormItem
					// style={{textAlign: '-webkit-Course'}}
					hasFeedback
					validateStatus={CourseCodeError ? 'error' : ''}
					help={CourseCodeError || ''}
				>
					{getFieldDecorator('code', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(<Input style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. Math 151" />)}
				</FormItem>
				<label htmlFor="new-course-name">Semester</label>
				<FormItem
					style={{ textAlign: '-webkit-Course' }}
					hasFeedback
					// label="Username"
					validateStatus={CourseYearError ? 'error' : ''}
					help={CourseYearError || ''}
				>
					{getFieldDecorator('semester', {
						rules: [{ required: true, message: 'enter semester!' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. 1" />)}
				</FormItem>
				<label htmlFor="new-course-std-cap">Programme</label>
				<FormItem
					// style={{textAlign: '-webkit-Course'}}
					hasFeedback
					validateStatus={CourseCapacityError ? 'error' : ''}
					help={CourseCapacityError || ''}
				>
					{getFieldDecorator('programme', {
						rules: [
							{
								required: true,
								type: 'number',
								message: 'name year!',
							},
						],
					})(
						<InputNumber
							min={1}
							max={5000}
							style={{ width: '100%', marginRight: '0.5rem' }}
							placeholder="e.g. 50"
						/>
					)}
				</FormItem>

				{/* <label htmlFor="new-course-std-cap">Capacity</label>
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
        </FormItem> */}
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						// className=""
						style={{ margin: '20px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError())}
					>
						{buttonText + ' course'}
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddCourse = Form.create({ name: 'normal_login' })(AddCourseForm);
