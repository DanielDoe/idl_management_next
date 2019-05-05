import React from 'react';
import AllocationContext from './allocation-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class AddAllocationForm extends React.Component {
	static contextType = AllocationContext;
	constructor(props) {
		super(props);

		this.state = {
			selectedItems: [],
		};
	}

	handleChange = selectedItems => {
		this.setState({ selectedItems });
		console.log(selectedItems);
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.context.addAllocationElements(values);
				console.log('Received values of form: ', values);
			}
		});
  };
  
  renderProgrammeData = () => {
    
  }

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	render() {
		const { selectedItems } = this.state;
		const filteredOptions = this.context.courses.filter(o => !selectedItems.includes(o));
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const AllocationNameError = isFieldTouched('name') && getFieldError('name');
		const AllocationCodeError = isFieldTouched('code') && getFieldError('code');
		//const AllocationYearError = isFieldTouched('year') && getFieldError('year');
		//	const AllocationCapacityError = isFieldTouched('capacity') && getFieldError('capacity');
		// const othersError = getFieldError('otherSize');

		const AllocationName = getFieldValue('name');
		const AllocationCode = getFieldValue('courses');
		// const AllocationYear = getFieldValue('year');
		// const AllocationCapacity = getFieldValue('capacity');

		const isEmpty = !AllocationName || !AllocationCode;
		// || !AllocationYear || !AllocationCapacity;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-allocation">
				<h2>Add Allocation </h2>
				<label htmlFor="new-allocation-name">Programme</label>
				<FormItem
					style={{ textAlign: '-webkit-allocation' }}
					hasFeedback
					// label="Username"
					validateStatus={AllocationNameError ? 'error' : ''}
					help={AllocationNameError || ''}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'enter name!' }],
					})(
						<Select style={{ width: "100%"}} placeholder="Computer Engineering 1">
              {this.context.programmes.map((elem, index) => {
                return(
                  <Option value={elem} key={elem}>{elem}</Option>
                )
              })}  
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-allocation-std-cap">Courses</label>
				<FormItem
					// style={{textAlign: '-webkit-Allocation'}}
					hasFeedback
					validateStatus={AllocationCodeError ? 'error' : ''}
					help={AllocationCodeError || ''}
				>
					{getFieldDecorator('courses', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
						initialValue: selectedItems,
					})(
						<Select
							mode="multiple"
							placeholder="Inserted are removed"
							// value={selectedItems}
							onChange={this.handleChange}
							style={{ width: '100%' }}
						>
							{filteredOptions.map(item => (
								<Select.Option key={item} value={item}>
									{item}
								</Select.Option>
							))}
						</Select>
					)}
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						size={'large'}
						// className=""
						style={{ margin: '20px auto', width: '100%', backgroundColor: '' }}
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError())}
					>
						Add Allocation
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export const AddAllocation = Form.create({ name: 'normal_login' })(AddAllocationForm);
