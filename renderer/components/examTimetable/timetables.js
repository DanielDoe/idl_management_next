import React, { Component } from 'react';
import { Row, Col, Input, Select, Button, Empty } from 'antd';
import Calender3 from '../_shared/img/calendar.png';
import Calender2 from '../_shared/img/calendar.png';
const Search = Input.Search;
const Option = Select.Option;
export default props => {
	const renderButtons = (element) => {
		if (props.user.auth_status === 'admin') {
			return (
				<Row gutter={6}>
					<Col span={8}>
						<Button
							name="timetable-content"
							icon="plus"
							onClick={() => props.onButtonPressed('timetable-content', element)}
						/>
					</Col>
					<Col span={8}>
						<Button
							name="timetable-content"
							icon="edit"
							onClick={() => props.onButtonPressed('timetable-content-edit', element)}
						/>
					</Col>
					<Col span={8}>
						<Button
							name="timetable-content"
							icon="delete"
							type="danger"
							onClick={() => props.onItemRemove(element)}
						/>
					</Col>
				</Row>
			);
		} else {
			return (
				<Row gutter={16}>
					<Col span={12}>
						<Button
							name="timetable-content"
							icon="edit"
							onClick={() => props.onButtonPressed('timetable-content', element)}
						/>
					</Col>
					<Col span={12}>
						<Button
							name="timetable-content"
							icon="delete"
							type="danger"
							onClick={() => props.onItemRemove(element)}
						/>
					</Col>
				</Row>
			);
		}
	};
	const renderContent = () => {
		if (props.dataSource.length !== 0) {
			return props.dataSource.map((element, id) => {
				return (
					<div className="column-timetable">
						<div className="card-timetable" key={'id' + id}>
							<img className="calender-img" src={id % 2 === 0 ? Calender3 : Calender2} alt="calender" />
							<h3>Week {id + 1}</h3>
							<p>semester: {element.semester}</p>
							<p>type: {element.type}</p>
							{renderButtons(element)}
						</div>
					</div>
				);
			});
		} else {
			return (
				<div className="empty-container">
					<Empty style={{ margin: '30% auto' }} />
				</div>
			);
		}
	};
	return (
		<div className="exams-list column">
			<div className="list-container">
				<Row gutter={16}>
					<Col span={6}>
						<Select
							className="exam-selector"
							defaultValue={props.user.auth_status !== 'admin' ? props.user.center : null}
							disabled={props.user.auth_status !== 'admin' ? true : false}
							//   onChange={e => setcenter(e)}
						>
							<Option value="1">1</Option>
							<Option value="2">2</Option>
						</Select>
					</Col>
					<Col span={6} />
					<Col span={6} />
					<Col span={6}>
						<Search
							placeholder="search for venue"
							// size="large"
							className="center-programme"
							onChange={e => onSearch(e)}
							style={{ width: '90%' }}
						/>
					</Col>
				</Row>
				<h2>List of timetables</h2>
				<div className="table-container">
					<div className="row-timetable">{renderContent()}</div>
				</div>
			</div>
		</div>
	);
};
