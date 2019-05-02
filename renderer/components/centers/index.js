import React from 'react';
import CenterAppBar from './center-appbar';
import { Row, Col } from 'antd';
import { AddCenters } from './newCenter';
import CenterList from './centerList';
import './center.css';

export default () => {
	return (
		<div style={{ width: '100%' }} id="center">
			<div style={{ paddingTop: '1rem' }}>
				<Row>
					<Col span={16}>
						<CenterList />
					</Col>
					<Col span={8}>
						<div>
							<AddCenters />
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};
