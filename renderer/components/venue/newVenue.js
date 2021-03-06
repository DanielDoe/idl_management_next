import React from 'react';
import VenueContext from './venue-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

// it worked.... woooo 
const FormItem = Form.Item;
const Option = Select.Option;
class AddVenueForm extends React.Component {
	static contextType = VenueContext;
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
					this.context.addVenueElements(values);
					console.log('Added received values of form: ', values);
					this.handleReset();
					// this.props.onCancel()
				} else {
					// this.context.updateVenueElements({venue_id: this.props.fieldData.venue_id, ...values});
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
				center_name: nextProps.fieldData.center,
				venue_name: nextProps.fieldData.venue_name,
				venue_capacity: nextProps.fieldData.capacity,
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

	renderCenterData = () => {
		const centers = this.context.centers.map((element, index) => {
			// console.log(element.name);
			return (
				<Option value={element.center_name} key={element.center_name + index}>
					{element.center_name}
				</Option>
			);
		});

		return centers;
	};

	render() {
		const header = this.props.editMode ? 'Edit' : 'New';
		const buttonText = this.props.editMode ? 'Edit' : 'Add';
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;

		const VenueCodeError = isFieldTouched('center_name') && getFieldError('center_name');
		const VenueNameError = isFieldTouched('venue_name') && getFieldError('venue_name');
		// const VenueYearError = isFieldTouched("year") && getFieldError("year");
		const VenueCapacityError = isFieldTouched('venue_capacity') && getFieldError('venue_capacity');
		// const othersError = getFieldError('otherSize');

		const VenueCode = getFieldValue('center_name');
		const VenueName = getFieldValue('venue_name');
		// const VenueYear = getFieldValue("year");
		const VenueCapacity = getFieldValue('venue_capacity');

		const isEmpty = !VenueName || !VenueCode || !VenueCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-venue">
				<h2>{header} Venue </h2>
				<label htmlFor="new-venue-name">Center</label>
				<FormItem
					// style={{ textAlign: "-webkit-venue" }}
					hasFeedback
					// label="Username"
					validateStatus={VenueNameError ? 'error' : ''}
					help={VenueNameError || ''}
				>
					{getFieldDecorator('center_name', {
						rules: [{ required: true, message: 'enter center!' }],
						initialValue: (this.context.user.auth_status !== 'admin') ? this.context.user.center : 'Accra'
					})(
						<Select placeholder="eg. Accra" style={{ width: '100%' }} disabled={(this.context.user.auth_status !== 'admin')? true : false}>
							{this.renderCenterData()}
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-venue-std-cap">Venue name</label>
				<FormItem
					// style={{textAlign: '-webkit-Venue'}}
					hasFeedback
					validateStatus={VenueCodeError ? 'error' : ''}
					help={VenueCodeError || ''}
				>
					{getFieldDecorator('venue_name', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(<Input style={{ width: '100%' }} placeholder="e.g. 50" />)}
				</FormItem>
				<label htmlFor="new-venue-std-cap">Capacity</label>
				<FormItem
					// style={{textAlign: '-webkit-Venue'}}
					hasFeedback
					validateStatus={VenueCapacityError ? 'error' : ''}
					help={VenueCapacityError || ''}
				>
					{getFieldDecorator('venue_capacity', {
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
						style={{ margin: '20px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError()) || isEmpty}
					>
						{buttonText + ' venue'}
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddVenue = Form.create({ name: 'venues' })(AddVenueForm);
