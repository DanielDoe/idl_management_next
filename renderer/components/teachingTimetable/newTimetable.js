import React from 'react';
import TeachingContext from './teaching-context';
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class AddTeachingForm extends React.Component {
	static contextType = TeachingContext;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
			center: this.props.user.auth_status !== 'admin' ? this.props.user.center : null,
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.props.editMode === false) {
					this.context.addTeachingElements(values);
					//   console.log("Added received values of form: ", values);
					this.handleReset();
					// this.props.onCancel()
				} else {
					// this.context.updateTeachingElements({teaching_id: this.props.fieldData.venue_id, ...values});
					//   console.log("Updated received values of form: ", values);
					this.handleReset();
					this.props.onCancel();
				}
			}
		});
	};

	componentDidMount() {
		// To disabled submit button at the beginning and checks validations.
		this.props.form.validateFields();
		// this.setState({
		// 	center: this.context.user.auth_status !== 'admin' ? this.context.user.center : null,
		// });
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
				<Option value={element.center_id} key={element.center_name + index}>
					{element.center_name}
				</Option>
			);
		});

		return centers;
	};

	renderProgramData = () => {
		const programmes = this.context.programmes
			.filter(element => element.center_id === this.state.center)
			.map((element, index) => {
				// console.log(element.name);
				return (
					<Option value={element.programme_id} key={element.name + element.year}>
						{element.programme_name}
					</Option>
				);
			});

		return programmes;
	};

	render() {
		const header = this.props.editMode ? 'Edit' : 'New';
		const buttonText = this.props.editMode ? 'Edit' : 'Add';
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;

		const teachingCenterError = isFieldTouched('center') && getFieldError('center');
		const teachingProgrammeError = isFieldTouched('programme') && getFieldError('programme');
		// const VenueYearError = isFieldTouched("year") && getFieldError("year");
		const teachingSemesterError = isFieldTouched('semester') && getFieldError('semester');
		// const othersError = getFieldError('otherSize');

		const teachingCenter = getFieldValue('center');
		const teachingProgramme = getFieldValue('programme');
		// const VenueYear = getFieldValue("year");
		const teachingSemester = getFieldValue('semester');

		const isEmpty = !teachingCenter || !teachingProgramme || !teachingSemester;

		return (
			<Form onSubmit={this.handleSubmit} className="column new-teaching">
				<h2>{header} timetable </h2>
				<label htmlFor="new-teaching-name">Center</label>
				<FormItem
					// style={{ textAlign: "-webkit-teaching" }}
					hasFeedback
					// label="Username"
					validateStatus={teachingCenterError ? 'error' : ''}
					help={teachingCenterError || ''}
				>
					{getFieldDecorator('center', {
						rules: [{ required: true, message: 'enter center!' }],
						initialValue: this.context.user.auth_status !== 'admin' ? this.context.user.center : null,
					})(
						<Select
							//   placeholder="eg. Accra"
							style={{ width: '100%' }}
							onChange={value => this.setState({ center: value })}
							disabled={this.context.user.auth_status !== 'admin' ? true : false}
						>
							{this.renderCenterData()}
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-teaching-std-cap">Programme</label>
				<FormItem
					// style={{textAlign: '-webkit-teaching'}}
					hasFeedback
					validateStatus={teachingProgrammeError ? 'error' : ''}
					help={teachingProgrammeError || ''}
				>
					{getFieldDecorator('programme', {
						rules: [
							{
								required: true,
								message: 'programme!',
							},
						],
					})(
						<Select
							placeholder="Programme"
							className="exam-selector"
							//   onChange={e => setprogramme(e)}
						>
							{this.renderProgramData()}
						</Select>
					)}
				</FormItem>
				<label htmlFor="new-teaching-std-cap">Semester</label>
				<FormItem
					// style={{textAlign: '-webkit-teaching'}}
					hasFeedback
					validateStatus={teachingSemesterError ? 'error' : ''}
					help={teachingSemesterError || ''}
				>
					{getFieldDecorator('semester', {
						rules: [
							{
								required: true,
								message: 'semester!',
							},
						],
					})(
						<Select
							placeholder="Semester"
							className="exam-selector"
							//   onChange={e => setsemester(e)}
						>
							<Option value="1">1</Option>
							<Option value="2">2</Option>
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
						disabled={this.hasErrors(getFieldsError()) || isEmpty}
					>
						{buttonText + ' teaching'}
					</Button>
				</FormItem>
				{this.renderCancel()}
			</Form>
		);
	}
}

export const AddTeaching = Form.create({ name: 'teaching' })(AddTeachingForm);
