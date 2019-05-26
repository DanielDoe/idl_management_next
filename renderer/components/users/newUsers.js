import React from 'react';
import UserContext from './user-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class AddUserForm extends React.Component {
	static contextType = UserContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
		};

		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.props.editMode === false) {
					this.context.addUserElements(values);
					// console.log('Added received values of form: ', values);
					this.handleReset();
					// this.props.onCancel()
				} else {
					this.context.updateUserElements({public_id: this.props.fieldData.public_id, ...values});
					// console.log('Updated received values of form: ', values);
					this.handleReset();
					this.props.onCancel();
				}
			}
		});
  };

  renderCenterData = () => {
    const elements = this.context.centers.map((element, index) => {
      // console.log(element.name);
      return (
        <Option value={element.center_name} key={element.center_name+index}>
          {element.center_name}
        </Option>
      )
    })

    return elements
  }
  
  componentDidMount() {
		// To disabled submit button at the beginning and checks validations.
		this.props.form.validateFields();
	}

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.fieldData).length !== 0 && nextProps.editMode === true && this.state.counter > 0) {
			this.props.form.setFieldsValue({
				email: nextProps.fieldData.email,
				full_name: nextProps.fieldData.full_name,
				status: nextProps.fieldData.status,
				center: nextProps.fieldData.center,
				phone: nextProps.fieldData.phone,
			});
			this.setState({ counter: -1 });
		}
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
		const UseEmailError = isFieldTouched('email') && getFieldError('email');
		const UseFullNameError = isFieldTouched('full_name') && getFieldError('full_name');
		const UseStatusError = isFieldTouched('status') && getFieldError('status');
		const UseCenterError = isFieldTouched('center_name') && getFieldError('center_name');
		const UserPhoneError = isFieldTouched('phone') && getFieldError('phone');
		// const othersError = getFieldError('otherSize');

		const UseEmail = getFieldValue('email');
		const UseFullName = getFieldValue('full_name');
		const UseStatus = getFieldValue('status');
		const UserPhone = getFieldValue('phone');
		const UserCenter = getFieldValue('center_name');

		const isEmpty = !UseEmail || !UseFullName || !UseStatus || !UserPhone || !UserCenter;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-user">
				<h2>{header} User </h2>
				<label htmlFor="new-user-name">Full name</label>
				<FormItem
					// style={{textAlign: '-webkit-User'}}
					hasFeedback
					validateStatus={UseFullNameError ? 'error' : ''}
					help={UseFullNameError || ''}
				>
					{getFieldDecorator('full_name', {
						rules: [
							{
								required: true,
								message: 'fullname!',
							},
						],
					})(<Input style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. Dr. Doe Daniel" />)}
				</FormItem>
				<label htmlFor="new-user-name">Email address</label>
				<FormItem
					style={{ textAlign: '-webkit-user' }}
					hasFeedback
					// label="Username"
					validateStatus={UseEmailError ? 'error' : ''}
					help={UseEmailError || ''}
				>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'enter email!', type: 'email' }],
					})(<Input style={{ width: '100%' }} placeholder="e.g. a@gmail.com" />)}
				</FormItem>
				<label htmlFor="new-user-name">Center</label>
				<FormItem
					style={{ textAlign: '-webkit-User' }}
					hasFeedback
					// label="Username"
					validateStatus={UseCenterError ? 'error' : ''}
					help={UseCenterError || ''}
				>
					{getFieldDecorator('center_name', {
						rules: [{ required: true, message: 'enter center!' }],
					})(
						<Select placeholder="eg. Accra" style={{ width: '100%' }}>
							{this.renderCenterData()}
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-user-name">Status</label>
				<FormItem
					style={{ textAlign: '-webkit-User' }}
					hasFeedback
					// label="Username"
					validateStatus={UseStatusError ? 'error' : ''}
					help={UseStatusError || ''}
				>
					{getFieldDecorator('status', {
						rules: [{ required: true, message: 'enter status!' }],
					})(
						<Select placeholder="eg. admin" style={{ width: '100%' }}>
							<Option value="admin">admin</Option>
							<Option value="user">user</Option>
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-user-std-cap">Phone number</label>
				<FormItem
					// style={{textAlign: '-webkit-User'}}
					hasFeedback
					validateStatus={UserPhoneError ? 'error' : ''}
					help={UserPhoneError || ''}
				>
					{getFieldDecorator('phone', {
						rules: [
							{
								required: true,
								type: 'number',
								message: 'name phone number!',
							},
						],
					})(<InputNumber style={{ width: '100%', marginRight: '0.5rem' }} placeholder="e.g. 0248666763" />)}
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
						{buttonText + ' user'}
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddUser = Form.create({ name: 'normal_login' })(AddUserForm);
