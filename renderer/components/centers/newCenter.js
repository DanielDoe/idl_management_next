import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';
import CenterContext from './center-context';

const FormItem = Form.Item;
const Option = Select.Option;

class AddCentersForm extends React.Component {
	static contextType = CenterContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
			year: null,
		};

		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (this.props.editMode === false) {
				this.context.addCenterElements(values);
				console.log('Added received values of form: ', values);
				this.handleReset();
				// this.props.onCancel()
			} else {
				this.context.updateCenterElements({center_id: this.props.fieldData.center_id, ...values});
				// console.log('Updated received values of form: ', values);
				this.handleReset();
				this.props.onCancel();
			}
		});
	};

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

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.fieldData).length !== 0 && nextProps.editMode === true && this.state.counter > 0) {
			this.props.form.setFieldsValue({
				center_name: nextProps.fieldData.center_name,
				center_code: nextProps.fieldData.center_code,
				center_block: nextProps.fieldData.center_block
			});
			this.setState({ counter: -1 });
		}
	}

	render() {
		const header = this.props.editMode ? 'Edit' : 'New';
		const buttonText = this.props.editMode ? 'Edit' : 'Add';
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const centerNameError = isFieldTouched('center_name') && getFieldError('center_name');
		const centerCodeError = isFieldTouched('center_code') && getFieldError('center_code');
		const centerBlockError = isFieldTouched('center_block') && getFieldError('center_block');

		const centerName = getFieldValue('center_name');
		const centerCode = getFieldValue('center_code');
		const centerBlock = getFieldValue('center_block');

		const isEmpty = !centerName || !centerCode || !centerBlock;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-center">
				<h2>{header} Center </h2>
				<label htmlFor="new-center-std-cap">Center name</label>
				<FormItem
					// style={{textAlign: '-webkit-center'}}
					hasFeedback
					validateStatus={centerNameError ? 'error' : ''}
					help={centerNameError || ''}
				>
					{getFieldDecorator('center_name', {
						rules: [
							{
								required: true,
								message: 'center!',
							},
						],
					})(
						<Input
							// min={1}
							// max={10}
							style={{ width: '100%', marginRight: '0.5rem' }}
							placeholder="e.g. Accra"
						/>
					)}
				</FormItem>
				<label htmlFor="new-center-std-cap">Center code</label>
				<FormItem
					// style={{textAlign: '-webkit-center'}}
					hasFeedback
					validateStatus={centerCodeError ? 'error' : ''}
					help={centerCodeError || ''}
				>
					{getFieldDecorator('center_code', {
						rules: [
							{
								required: true,
								message: 'session amount!',
							},
						],
					})(
						<Input
							// min={1}
							// max={1000}
							style={{ width: '100%', marginRight: '0.5rem' }}
							placeholder="e.g. ACC"
						/>
					)}
				</FormItem>
				<label htmlFor="new-center-std-cap">Blocks</label>
				<FormItem
					style={{ textAlign: '-webkit-Course' }}
					hasFeedback
					// label="Username"
					validateStatus={centerBlockError ? 'error' : ''}
					help={centerBlockError || ''}
				>
					{getFieldDecorator('center_block', {
						rules: [{ required: true, message: 'enter block!' }],
					})(
						<InputNumber
							onChange={this.handleChange}
							min={1}
							max={5}
							style={{ width: '100%' }}
							placeholder="e.g. 3"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						// className=""
						style={{ margin: '20px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError()) && isEmpty}
					>
					{buttonText + ' center'} 
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddCenters = Form.create({ name: 'normal_login' })(AddCentersForm);
