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
			selectedItems: []
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
				// console.log('Received values of form: ', values);
			}
		});
	};

	renderProgrammeData = () => {};

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	render() {
		const { selectedItems } = this.state;
		const filteredOptions = this.context.courses.filter(o => !selectedItems.includes(o));
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
		const AllocationNameError = isFieldTouched('programme_id') && getFieldError('programme_id');
		const AllocationSem1Error = isFieldTouched('sem_1') && getFieldError('sem_1');
		const AllocationSem2Error = isFieldTouched('sem_2') && getFieldError('sem_2');
		//	const AllocationCapacityError = isFieldTouched('capacity') && getFieldError('capacity');
		// const othersError = getFieldError('otherSize');

		const AllocationName = getFieldValue('programme_id');
		const AllocationSem1 = getFieldValue('sem_1');
		const AllocationSem2 = getFieldValue('sem_2');
		// const AllocationCapacity = getFieldValue('capacity');

		const isEmpty = !AllocationName || !AllocationSem1 || !AllocationSem2;
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
					{getFieldDecorator('programme_id', {
						rules: [{ required: true, message: 'enter name!' }],
					})(
						<Select
							onChange={value => console.log(value)}
							style={{ width: '100%' }}
							placeholder="Computer Engineering 1"
						>
							{this.context.programmes.map((elem, index) => {
								return (
									<Option value={elem.programme_id} key={elem.programme_id}>
										{elem.programme_name}
									</Option>
								);
							})}
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-allocation-std-cap">Semester 1</label>
				<FormItem
					// style={{textAlign: '-webkit-Allocation'}}
					hasFeedback
					validateStatus={AllocationSem1Error ? 'error' : ''}
					help={AllocationSem1Error || ''}
				>
					{getFieldDecorator('sem_1', {
						rules: [
							{
								required: true,
								message: 'code!',
							},
						],
					})(
						<Select
							mode="multiple"
							placeholder="semester"
							// value={selectedItems}
							onChange={value => this.setState({ sem: value })}
							style={{ width: '100%' }}
						>
							{filteredOptions
								.filter(e => e.semester == 1)
								.map((item, index) => (
									<Select.Option key={item + index} value={`${item.course_id}`}>
										{item.course_title}
									</Select.Option>
								))}
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-allocation-std-cap">Semester 2</label>
				<FormItem
					// style={{textAlign: '-webkit-Allocation'}}
					hasFeedback
					validateStatus={AllocationSem2Error ? 'error' : ''}
					help={AllocationSem2Error || ''}
				>
					{getFieldDecorator('sem_2', {
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
							{filteredOptions
								.filter(e => e.semester == 2)
								.map((item, index) => (
									<Select.Option key={item + index} value={`${item.course_id}`}>
										{item.course_title}
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
