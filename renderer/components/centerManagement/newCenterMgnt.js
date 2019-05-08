import React from 'react';
import CenterMgntContext from './centerMgnt-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class AddCenterMgntForm extends React.Component {
	static contextType = CenterMgntContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
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

	handleChange(value) {
		console.log(`selected ${value}`);
	}

	componentDidMount() {
		// To disabled submit button at the beginning and checks validations.
		this.props.form.validateFields();
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.fieldData).length !== 0 && nextProps.editMode === true && this.state.counter > 0) {
			this.props.form.setFieldsValue({
				center: nextProps.fieldData.center,
				programmes: nextProps.fieldData.code,
				// year: nextProps.fieldData.year,
				// capacity: nextProps.fieldData.capacity,
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
		const CenterMgntCenterError = isFieldTouched('center') && getFieldError('center');
		const CenterMgntSelectionError = isFieldTouched('selection') && getFieldError('selection');
		const CenterMgntSelectedError = isFieldTouched('selected') && getFieldError('selected');
		const CenterMgntCapacityError = isFieldTouched('capacity') && getFieldError('capacity');
		// const othersError = getFieldError('otherSize');

		const CenterMgntCenter = getFieldValue('center');
		const CenterMgntSelection = getFieldValue('selection');
		const CenterMgntSelected = getFieldValue('selected');
		const CenterMgntCapacity = getFieldValue('capacity');

		const isEmpty = !CenterMgntCenter || !CenterMgntSelection || !CenterMgntSelected || !CenterMgntCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-centerMgnt">
				<h2>{header} Allocation </h2>
				<label htmlFor="new-centerMgnt-name">Center</label>
				<FormItem
					style={{ textAlign: '-webkit-centerMgnt' }}
					hasFeedback
					// label="Username"
					validateStatus={CenterMgntCenterError ? 'error' : ''}
					help={CenterMgntCenterError || ''}
				>
					{getFieldDecorator('center', {
						rules: [{ required: true, message: 'enter name!' }],
					})(
						<Select placeholder="e.g. Accra" style={{ width: '100%' }} onChange={this.handleChange}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="disabled" disabled>
								Disabled
							</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-centerMgnt-std-cap">Allocation Type</label>
				<FormItem
					// style={{textAlign: '-webkit-CenterMgnt'}}
					hasFeedback
					validateStatus={CenterMgntSelectionError ? 'error' : ''}
					help={CenterMgntSelectionError || ''}
				>
					{getFieldDecorator('programmes', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(
						<Select placeholder="e.g. programmes" style={{ width: '100%' }} onChange={this.handleChange}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="disabled" disabled>
								Disabled
							</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-centerMgnt-std-cap">Programmes/Courses</label>
				<FormItem
					// style={{textAlign: '-webkit-CenterMgnt'}}
					hasFeedback
					validateStatus={CenterMgntSelectedError ? 'error' : ''}
					help={CenterMgntSelectedError || ''}
				>
					{getFieldDecorator('programmes', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(
						<Select placeholder="e.g list of courses" style={{ width: '100%' }} onChange={this.handleChange}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="disabled" disabled>
								Disabled
							</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-centerMgnt-std-cap">Capacity</label>
				<FormItem
					// style={{textAlign: '-webkit-Venue'}}
					hasFeedback
					validateStatus={CenterMgntCapacityError ? 'error' : ''}
					help={CenterMgntCapacityError || ''}
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
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						// className=""
						style={{ margin: '10px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError()) || isEmpty}
					>
						{buttonText + ' allocation'}
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddCenterMgnt = Form.create({ name: 'normal_login' })(AddCenterMgntForm);
