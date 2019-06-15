import React, { Component, useState, useEffect } from "react";
import { Row, Col, Carousel } from "antd";
import School from "../_shared/img/school.png";
import Calender from "../_shared/img/calendar1.png";
import Screen from "../_shared/img/analytics.png";

// export default class LoginCarousel extends Component {
// 	render() {
// 		const typerwriter = text => {
// 			if (typeof window != 'undefined') {
// 				var Typewriter = require('typewriter-effect');
// 				return (
// 					<Typewriter
// 						options={{
// 							strings: text,
// 							autoStart: true,
// 							loop: true,
// 						}}
// 					/>
// 				);
// 			}
// 		};
// 		return (
// 			<div className="sider-container-style">
// 				<Row gutter={10} style={{ margin: '2rem auto' }}>
// 					<Col span={6}>
// 						<img className="sider-img" src={Screen} alt="school-img" />
// 					</Col>
// 					<Col span={18} className="sider-img">
// 						<div className="type-writer-class">
// 							{typerwriter([
// 								'Manage your centers',
// 								'Add new centers',
// 								'Update center details',
// 								'Remove center data',
// 								'Manage center coordinators',
// 								'Manage teaching timetable',
// 								'Manage exams timetable',
// 								'Manage student centers',
// 							])}
// 						</div>
// 					</Col>
// 				</Row>
// 			</div>
// 		);
// 	}
// }

export default () => {
  return (
    <div className="carousel-container">
      <Carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  );
};
