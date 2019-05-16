import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CenterContext from './center-context';
import { AddCenters } from './newCenter';
import CenterList from './centerList';
import { getData, manageCenters } from '../_shared//axiosCalls';
import './center.css';

export default () => {
	const [centers, setCenters] = useState([]);
	const center = JSON.parse(localStorage.getItem('login')).center;
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};
	const routeURL = 'http://10.30.3.17:5000/center';
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);

	const addCenterElements = center => {
		console.log('Adding centers', center);
		manageCenters({ ...center, url: routeURL, headers, type: 'post' });
		setCenters([...centers, center]);
	};

	const removeCenterElements = center => {
		console.log('Removing centers', center, 'centers: ', centers);
		const newCenters = centers;
		const idx = newCenters.indexOf(center);
		// call manage centers here!!!
		console.log('id: ', idx, 'newCenter: ', newCenters);
		// manageCenters({ ...center, url: routeURL, headers, type: 'delete' });
		newCenters.splice(idx, 1)
		setCenters(newCenters);
	};

	const updateCenterElements = center => {
		console.log('Updating centers', center);
	};

	const onCenterEditted = center => {
		seteditMode(true);
		setfieldData(center);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		getData({ url: routeURL, headers }).then(data => {
			data.centers.length !== 0 ? setCenters(data.centers) : setCenters([]);
			console.log(data);
		});
	}, []);

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
							<CenterList centers={centers} onCenterEditted={onCenterEditted} />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddCenters
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onCenterEditted={onCenterEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</CenterContext.Provider>
	);
};
