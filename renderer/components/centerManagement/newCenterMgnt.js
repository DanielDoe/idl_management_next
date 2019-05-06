import React from 'react';
import CenterMgntContext from './centerMgnt-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;

class AddCenterMgntForm extends React.Component {
	static contextType = CenterMgntContext;
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
		const CenterMgntNameError = isFieldTouched('center') && getFieldError('center');
		const CenterMgntCodeError = isFieldTouched('programmes') && getFieldError('programmes');
		// const CenterMgntYearError = isFieldTouched('year') && getFieldError('year');
		// const CenterMgntCapacityError = isFieldTouched('capacity') && getFieldError('capacity');
		// const othersError = getFieldError('otherSize');

		const CenterMgntName = getFieldValue('center');
		const CenterMgntCode = getFieldValue('programmes');
		// const CenterMgntYear = getFieldValue('year');
		// const CenterMgntCapacity = getFieldValue('capacity');

		const isEmpty = !CenterMgntName || !CenterMgntCode || !CenterMgntYear || !CenterMgntCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-centerMgnt">
				<h2>{header} Allocation </h2>
				<label htmlFor="new-centerMgnt-name">Center</label>
				<FormItem
					style={{ textAlign: '-webkit-centerMgnt' }}
					hasFeedback
					// label="Username"
					validateStatus={CenterMgntNameError ? 'error' : ''}
					help={CenterMgntNameError || ''}
				>
					{getFieldDecorator('center', {
						rules: [{ required: true, message: 'enter name!' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. Computer Engineering" />)}
				</FormItem>
				<label htmlFor="new-centerMgnt-std-cap">Programmes</label>
				<FormItem
					// style={{textAlign: '-webkit-CenterMgnt'}}
					hasFeedback
					validateStatus={CenterMgntCodeError ? 'error' : ''}
					help={CenterMgntCodeError || ''}
				>
					{getFieldDecorator('programmes', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(<Input style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. COE" />)}
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
