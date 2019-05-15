import React from 'react';
import UserContext from './user-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class AddUserForm extends React.Component {
	static contextType = UserContext;

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.context.addUserElements(values);
				// console.log('Received values of form: ', values);
			}
		});
	};

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const UseEmailError = isFieldTouched('email') && getFieldError('email');
		const UseFullNameError = isFieldTouched('full_name') && getFieldError('full_name');
		const UseStatusError = isFieldTouched('status') && getFieldError('status');
		const UserPhoneError = isFieldTouched('phone') && getFieldError('phone');
		// const othersError = getFieldError('otherSize');

		const UseEmail = getFieldValue('email');
		const UseFullName = getFieldValue('full_name');
		const UseStatus = getFieldValue('status');
		const UserPhone = getFieldValue('phone');

		const isEmpty = !UseEmail || !UseFullName || !UseStatus || !UserPhone;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-user">
				<h2>Add User </h2>
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
					})(
						<InputNumber
							style={{ width: '100%', marginRight: '0.5rem' }}
							placeholder="e.g. 0248666763"
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
						Add User
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export const AddUser = Form.create({ name: 'normal_login' })(AddUserForm);
