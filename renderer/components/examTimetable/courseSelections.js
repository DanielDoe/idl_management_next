import React, { useState, useEffect } from 'react';
import Calender from '../_shared/img/calendar.png';
import { Transfer, Button, Row, Col, Icon } from 'antd';

export default class ExamTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mockData: [],
			targetKeys: [],
		};
	}

	componentDidMount() {
		this.getMock();
	}

	// componentWillUpdate() {
	//   console.log(mockData);
	// }

	getMock = () => {
		const targetKeys = [];
		// const mockData = this.props.courses;
		// for (let i = 0; i < 20; i++) {
		// 	const data = {
		// 		key: i.toString(),
		// 		title: `content${i + 1}`,
		// 		description: `description of content${i + 1}`,
		// 	};
		// 	mockData.push(data);
		// }
		const mockData = this.props.courses.map((element, id) => {
			return {
				course_id: element.course_id,
				key: id,
				course_title: element.course_title,
				course_code: element.course_code,
				title: `${element.course_code}-${element.course_title}`,
				// chosen: Math.random() * 2 > 1,
			};
		});
		this.setState({ mockData });
		// console.log(mockData)
	};

	handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys });
    console.log(targetKeys, moveKeys);
	};

	renderFooter = () => (
		<Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
			reload
		</Button>
	);

	render() {
		const { fieldData } = this.props;
		return (
			<div style={{ height: '100%', width: '100%' }}>
				<Row gutter={8} style={{ height: '100%', width: '100%' }}>
					<Col span={6} style={{ height: '100%' }}>
						<Button onClick={() => this.props.onButtonPressed('timetable', [])}>
							<Icon type="left" />
							Go back
						</Button>
						<div style={{ margin: '5rem 0rem' }}>
							<Row>
								<Col span={3}>
									<img src={Calender} className="calender-img" alt="exam-timetable" />
								</Col>
								<Col span={21}>
									<ul className="nobull">
										<li>{'Code: ' + fieldData.course_code}</li>
										<li>{'Title: ' + fieldData.course_title}</li>
										<li>{'Semester: ' + fieldData.semester}</li>
										<li>{'Type: ' + fieldData.type}</li>
									</ul>
								</Col>
							</Row>
						</div>
					</Col>
					<Col span={18} className="transfer-col">
						<div style={{ height: '100%', width: '100%', margin: '0rem 2rem' }}>
							<h2 className="courses-list">List of Courses to Assign</h2>
							<Transfer
								dataSource={this.state.mockData}
								showSearch
								style={{ height: '100%', width: '100%' }}
								listStyle={{
									width: '40%',
									height: 'calc(100% - 5rem)',
								}}
								operations={['to right', 'to left']}
								targetKeys={this.state.targetKeys}
								onChange={this.handleChange}
								render={item => `${item.title}`}
								footer={this.renderFooter}
							/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

// props => {
// 	const [courses, setcourses] = useState([]);
// 	const [selectedCourses, setselectedCourses] = useState([]);

// 	useEffect(() => {
//     // getCourse();
//     const course = props.courses.map((element, id) => {
// 			return {
// 				course_id: element.course_id,
// 				key: id,
// 				course_title: element.course_title,
// 				course_code: element.course_code,
// 				title: `${element.course_code}-${element.course_title}`,
// 				// chosen: Math.random() * 2 > 1,
// 			};
//     });

//     setcourses(course);
//     console.log(courses);
// 		return () => {
// 			console.log('Unmounted');
// 		};
// 	}, [props.courses]);

// 	const handleChange = targetKeys => {
// 		setselectedCourses(targetKeys);
// 	};

// 	// const renderFooter = () => (
// 	// 	<Button size="small" style={{ float: 'right', margin: 5 }} onClick={() => getCourse()}>
// 	// 		reload
// 	// 	</Button>
// 	// );

// 	return (
// 		<div>
// 			<div>
// 				<Row gutter={16}>
// 					<Col span={8}>
// 						<Button onClick={() => props.onButtonPressed('timetable', [])}>
// 							<Icon type="left" />
// 							Go back
// 						</Button>
// 					</Col>
// 					<Col span={8} />
// 					<Col span={8} />
// 					<Col span={8} />
// 				</Row>
// 			</div>
// 			<div />
// 			{
// 				// <Transfer
// 				// 	dataSource={courses}
// 				// 	showSearch
// 				// 	listStyle={{
// 				// 		width: 250,
// 				// 		height: 300,
// 				// 	}}
// 				// 	operations={['to right', 'to left']}
// 				// 	targetKeys={selectedCourses}
// 				// 	onChange={() => handleChange()}
// 				// 	// render={item => item.title}
// 				// 	footer={renderFooter}
// 				// />
// 			}
// 		</div>
// 	);
// };
