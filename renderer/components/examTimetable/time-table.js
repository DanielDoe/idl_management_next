import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Calender from '../_shared/img/calendar.png';
import { Select, Modal, Row, Col, Button } from 'antd';
import swal from 'sweetalert';

export default props => {
	const { fieldData } = props;
	return (
		<div style={{ height: '100%' }}>
			<div>Some header</div>
			<Row>
				<Col span={8}>
					<div style={{ margin: '5rem 0rem' }}>
						<Row gutter={6} >
							<Col span={3} >
								<img src={Calender} className="calender-img" alt="exam-timetable" />
							</Col>
							<Col span={21} >
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
				<Col span={16}>
					<p>Something 2</p>
				</Col>
			</Row>
		</div>
	);
};
