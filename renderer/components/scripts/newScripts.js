import React from 'react';
import ScriptContext from './script-context';
import { Form, Icon, Input, Button, Row, Col, Select, InputNumber } from 'antd';

const FormItem = Form.Item;

class AddScriptForm extends React.Component {
	static contextType = ScriptContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
			std: null,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
				name: nextProps.fieldData.name,
				course: nextProps.fieldData.course,
				std: nextProps.fieldData.std,
				pack: nextProps.fieldData.pack,
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
		this.setState({ std: value });
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

	renderImport() {
		return (
			<button
				type="button"
				style={{ margin: '0px auto', width: '100%' }}
				// onClick={() => {
				// 	this.props.onCancel();
				// 	this.handleReset();
				// }}
			>
				Import
			</button>
		);
	}

	render() {
		const header = this.props.editMode ? 'Edit' : 'New';
		const buttonText = this.props.editMode ? 'Edit' : 'Add';
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const scriptNameError = isFieldTouched('center') && getFieldError('center');
		const scriptCourseError = isFieldTouched('course') && getFieldError('course');
		const scriptPackError = isFieldTouched('pack') && getFieldError('pack');
		const scriptStdError = isFieldTouched('std') && getFieldError('std');
		// const scriptCapacityError = isFieldTouched('capacity') && getFieldError('capacity');
		// const othersError = getFieldError('otherSize');

		const scriptName = getFieldValue('center');
		const scriptCourse = getFieldValue('course');
		const scriptPack = getFieldValue('pack');
		const scriptStd = getFieldValue('std');
		// const scriptCapacity = getFieldValue('capacity');

		const isEmpty = !scriptName || !scriptCourse || !scriptStd || !scriptPack;
		// || !scriptCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-script">
				<h2>{header} script </h2>
				<label htmlFor="new-script-center">Center</label>
				<FormItem
					style={{ textAlign: '-webkit-script' }}
					hasFeedback
					// label="Usercenter"
					validateStatus={scriptNameError ? 'error' : ''}
					help={scriptNameError || ''}
				>
					{getFieldDecorator('center', {
						rules: [{ required: true, message: 'enter center!' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. Computer Engineering" />)}
				</FormItem>
				<label htmlFor="new-script-std-cap">Course</label>
				<FormItem
					// style={{textAlign: '-webkit-script'}}
					hasFeedback
					validateStatus={scriptCourseError ? 'error' : ''}
					help={scriptCourseError || ''}
				>
					{getFieldDecorator('course', {
						rules: [
							{
								required: true,
								message: 'course!',
							},
						],
					})(<Input style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. COE" />)}
				</FormItem>

				<Row>
					<Col span={12} style={{ paddingRight: '1rem' }}>
						<label htmlFor="new-script-name">Packs</label>
						<FormItem
							style={{ textAlign: '-webkit-script' }}
							hasFeedback
							// label="Username"
							validateStatus={scriptPackError ? 'error' : ''}
							help={scriptPackError || ''}
						>
							{getFieldDecorator('pack', {
								rules: [{ required: true, message: 'enter std group!' }],
							})(<InputNumber min={1} max={10} style={{ width: '100%' }} placeholder="e.g. 1" />)}
						</FormItem>
					</Col>
					<Col span={12} style={{ paddingLeft: '1rem' }}>
						<label htmlFor="new-script-name">Students</label>
						<FormItem
							style={{ textAlign: '-webkit-script' }}
							hasFeedback
							// label="Username"
							validateStatus={scriptStdError ? 'error' : ''}
							help={scriptStdError || ''}
						>
							{getFieldDecorator('std', {
								rules: [{ required: true, message: 'enter std group!' }],
							})(
								<InputNumber
									onChange={this.handleChange}
									min={1}
									max={10}
									style={{ width: '100%' }}
									placeholder="e.g. 1"
								/>
							)}
						</FormItem>
					</Col>
				</Row>

				{/* <label htmlFor="new-script-std-cap">Capacity</label>
				<FormItem
					// style={{textAlign: '-webkit-script'}}
					hasFeedback
					validateStatus={scriptCapacityError ? 'error' : ''}
					help={scriptCapacityError || ''}
				>
					{getFieldDecorator('capacity', {
						rules: [
							{
								required: true,
								type: 'number',
								message: 'name std!',
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
				</FormItem> */}
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						// className=""
						style={{ margin: '10px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError()) || isEmpty}
					>
						{buttonText + ' script'}
					</Button>
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						style={{ margin: '0px auto', width: '100%' }}
						onClick={() => {
							this.props.onListUpload(this.state.std);
							this.handleReset();
						}}
						// onClick={() => {
						// 	this.props.onCancel();
						// 	this.handleReset();
						// }}
						disabled={!scriptPack || !scriptStd}
					>
						Import
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddScript = Form.create({ name: 'normal_login' })(AddScriptForm);
