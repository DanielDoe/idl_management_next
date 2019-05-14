import React, { useState } from 'react';
import { Row, Col } from 'antd';
import CenterContext from './center-context';
import { AddCenters } from './newCenter';
import CenterList from './centerList';
import axios from 'axios';
import { dbStore } from '../_shared/initialStoreState';
import './center.css';

export default () => {
	const [centers, setCenters] = useState(dbStore.centers);

	const addCenterElements = center => {
		// updatedCenters = centers
		// setCenters(newCenter);
		// let newCenter = [];
		// console.log('Adding centers', newCenter);

		var headers = {
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('login').token,
		};
		axios
			.post('', center, { headers: headers })

			.then(response => {
        // dispatch({ type: FOUND_USER, data: response.data[0] });
        console.log(response)
			})
			.catch(error => {
        // dispatch({ type: ERROR_FINDING_USER });
        console.log(error)
			});
		// setCenters(centers.push(center))
	};

	const removeCenterElements = center => {
		console.log('Removing centers', center);
	};

	const updateCenterElements = center => {
		console.log('Updating centers', center);
	};

	return (
		<CenterContext.Provider
			value={{
				centers: centers,
				addCenterElements: addCenterElements,
				removeCenterElements: removeCenterElements,
				updateCenterElements: updateCenterElements,
			}}
		>
			<div style={{ width: '100%' }} id="center">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<CenterList />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddCenters />
						</Col>
					</Row>
				</div>
			</div>
		</CenterContext.Provider>
	);
};
