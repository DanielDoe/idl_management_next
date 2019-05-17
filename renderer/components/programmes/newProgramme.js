import React from 'react';
import ProgrammeContext from './programme-context';
import { Form, Icon, Input, Button, Row, Col, Select, InputNumber } from 'antd';

const FormItem = Form.Item;

class AddProgrammeForm extends React.Component {
	static contextType = ProgrammeContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
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
				programme_name: nextProps.fieldData.programme_name,
				programme_code: nextProps.fieldData.programme_code,
				programme_year: nextProps.fieldData.programme_year,
				programme_initial: nextProps.fieldData.programme_initial,
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
		this.setState({ year: value });
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
		const programmeNameError = isFieldTouched('programme_name') && getFieldError('programme_name');
		const programmeCodeError = isFieldTouched('programme_code') && getFieldError('programme_code');
		const programmeInitialError = isFieldTouched('programme_initial') && getFieldError('programme_initial');
		const programmeYearError = isFieldTouched('programme_year') && getFieldError('programme_year');
		// const programmeCapacityError = isFieldTouched('capacity') && getFieldError('capacity');
		// const othersError = getFieldError('otherSize');

		const programmeName = getFieldValue('programme_name');
		const programmeCode = getFieldValue('programme_code');
		const programmeInitial = getFieldValue('programme_initial');
		const programmeYear = getFieldValue('programme_year');
		// const programmeCapacity = getFieldValue('capacity');

		const isEmpty = !programmeName || !programmeCode || !programmeYear || !programmeInitial;
		// || !programmeCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-programme">
				<h2>{header} programme </h2>
				<label htmlFor="new-programme-name">Programme name</label>
				<FormItem
					style={{ textAlign: '-webkit-programme' }}
					hasFeedback
					// label="Username"
					validateStatus={programmeNameError ? 'error' : ''}
					help={programmeNameError || ''}
				>
					{getFieldDecorator('programme_name', {
						rules: [{ required: true, message: 'enter name!' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. Computer Engineering" />)}
				</FormItem>
				<label htmlFor="new-programme-std-cap">Programme code</label>
				<FormItem
					// style={{textAlign: '-webkit-programme'}}
					hasFeedback
					validateStatus={programmeCodeError ? 'error' : ''}
					help={programmeCodeError || ''}
				>
					{getFieldDecorator('programme_code', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(<Input style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. COE" />)}
				</FormItem>
				<label htmlFor="new-programme-name">Year group</label>
				<Row>
					<Col span={12} style={{ paddingRight: '1rem' }}>
						<FormItem
							style={{ textAlign: '-webkit-programme' }}
							hasFeedback
							// label="Username"
							validateStatus={programmeInitialError ? 'error' : ''}
							help={programmeInitialError || ''}
						>
							{getFieldDecorator('programme_initial', {
								rules: [{ required: true, message: 'enter year group!' }],
							})(<InputNumber min={1} max={10} style={{ width: '100%' }} placeholder="e.g. 1" />)}
						</FormItem>
					</Col>
					<Col span={12} style={{ paddingLeft: '1rem' }}>
						<FormItem
							style={{ textAlign: '-webkit-programme' }}
							hasFeedback
							// label="Username"
							validateStatus={programmeYearError ? 'error' : ''}
							help={programmeYearError || ''}
						>
							{getFieldDecorator('programme_year', {
								rules: [{ required: true, message: 'enter year group!' }],
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

				{/* <label htmlFor="new-programme-std-cap">Capacity</label>
				<FormItem
					// style={{textAlign: '-webkit-programme'}}
					hasFeedback
					validateStatus={programmeCapacityError ? 'error' : ''}
					help={programmeCapacityError || ''}
				>
					{getFieldDecorator('capacity', {
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
						{buttonText + ' programme'}
					</Button>
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						style={{ margin: '0px auto', width: '100%' }}
						onClick={() => {
							this.props.onListUpload(this.state.year);
							this.handleReset();
						}}
						// onClick={() => {
						// 	this.props.onCancel();
						// 	this.handleReset();
						// }}
						disabled={!programmeInitial || !programmeYear}
					>
						Import
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddProgramme = Form.create({ name: 'normal_login' })(AddProgrammeForm);
