import React from 'react';
import CourseContext from './course-context';
import { Form, Row, Col, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;

class AddCourseForm extends React.Component {
	static contextType = CourseContext;

	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
			semester: null,
			year: null,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.props.editMode === false) {
					this.context.addCourseElements(values);
					// this.context.addCourseElements(values);
					// console.log('Added received values of form: ', values);
					this.handleReset();
					// this.props.onCancel()
				} else {
					this.context.updateCourseElements({course_id: this.props.fieldData.course_id, ...values});
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
		if (Object.keys(nextProps.fieldData).length !== 0 && nextProps.editMode === true && this.state.counter > 0) {
			this.props.form.setFieldsValue({
				course_title: nextProps.fieldData.course_title,
				course_code: nextProps.fieldData.course_code,
				semester: nextProps.fieldData.semester,
				year: nextProps.fieldData.year,
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
		const CourseNameError = isFieldTouched('course_title') && getFieldError('course_title');
		const CourseCodeError = isFieldTouched('course_code') && getFieldError('course_code');
		const CourseSemesterError = isFieldTouched('semester') && getFieldError('semester');
		const CourseYearError = isFieldTouched('year') && getFieldError('year');
		// const othersError = getFieldError('otherSize');

		const CourseName = getFieldValue('course_title');
		const CourseCode = getFieldValue('course_code');
		const CourseSemester = getFieldValue('semester');
		const CourseYear = getFieldValue('year');

		const isEmpty = !CourseName || !CourseCode || !CourseSemester || !CourseYear;
		// || !CourseCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-course">
				<h2>{header} Course </h2>
				<label htmlFor="new-course-name">Course name</label>
				<FormItem
					style={{ textAlign: '-webkit-course' }}
					hasFeedback
					// label="Username"
					validateStatus={CourseNameError ? 'error' : ''}
					help={CourseNameError || ''}
				>
					{getFieldDecorator('course_title', {
						rules: [{ required: true, message: 'enter course_title!' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. Algebra" />)}
				</FormItem>
				<label htmlFor="new-course-std-cap">Course code</label>
				<FormItem
					// style={{textAlign: '-webkit-Course'}}
					hasFeedback
					validateStatus={CourseCodeError ? 'error' : ''}
					help={CourseCodeError || ''}
				>
					{getFieldDecorator('course_code', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(<Input style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. Math 151" />)}
				</FormItem>
				<Row gutter={16}>
					<Col span={12}>
						<label htmlFor="new-course-name">Semester</label>
						<FormItem
							style={{ textAlign: '-webkit-Course' }}
							hasFeedback
							// label="Username"
							validateStatus={CourseSemesterError ? 'error' : ''}
							help={CourseSemesterError || ''}
						>
							{getFieldDecorator('semester', {
								rules: [{ required: true, message: 'enter semester!' }],
							})(
								<InputNumber
									onChange={value => this.setState({ semester: value })}
									min={1}
									max={10}
									style={{ width: '100%' }}
									placeholder="e.g. 1"
								/>
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<label htmlFor="new-course-name">Year</label>
						<FormItem
							style={{ textAlign: '-webkit-Course' }}
							hasFeedback
							// label="Username"
							validateStatus={CourseYearError ? 'error' : ''}
							help={CourseYearError || ''}
						>
							{getFieldDecorator('year', {
								rules: [{ required: true, message: 'enter semester!' }],
							})(
								<InputNumber
									onChange={value => this.setState({ year: value })}
									min={1}
									max={10}
									style={{ width: '100%' }}
									placeholder="e.g. 1"
								/>
							)}
						</FormItem>
					</Col>
				</Row>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						// className=""
						style={{ margin: '20px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError()) || isEmpty}
					>
						{buttonText + ' course'}
					</Button>
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						style={{ margin: '0px auto', width: '100%' }}
						onClick={() => {
							this.props.onListUpload(this.state.semester);
							this.handleReset();
						}}
						// onClick={() => {
						// 	this.props.onCancel();
						// 	this.handleReset();
						// }}
						disabled={!CourseSemester || !CourseYear}
					>
						Import
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddCourse = Form.create({ name: 'normal_login' })(AddCourseForm);
