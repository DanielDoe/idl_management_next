import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CenterMgntContext from './centerMgnt-context';
import { AddCenterMgnt } from './newCenterMgnt';
import CenterMgntList from './centerMgntList';
import { dbStore } from '../_shared/initialStoreState';
import './centerMgnt.css';

export default () => {
	const [centerMgnts, setCenterMgnts] = useState([
		//make a db call for the already allocated programmes
		{
			name: 'Computer Engineering',
			code: 'COE',
			year: 1,
			capacity: 40,
		},
		{
			name: 'Computer Engineering',
			code: 'COE',
			year: 2,
			capacity: 50,
		},
		{
			name: 'Computer Engineering',
			code: 'COE',
			year: 3,
			capacity: 60,
		},
		{
			name: 'Computer Engineering',
			code: 'COE',
			year: 4,
			capacity: 30,
		},
	]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const [centers, setCenters] = useState(
		// get request to the db for available venues
		dbStore.centers
	);
	const user = typeof window === 'undefined' ? {} : JSON.parse(localStorage.getItem('login'));
	const addCenterMgntElements = centerMgnt => {
		let newValues = [...venues, centerMgnt];
		console.log('Venues: ', newValues);
		setCenterMgnts(newValues);
		// console.log("Adding CenterMgnts", CenterMgnt);
	};
	
	const removeCenterMgntElements = centerMgnt => {
		console.log('Removing CenterMgnts', centerMgnt);
	};

	const updateCenterMgntElements = centerMgnt => {
		console.log('Updating CenterMgnts', centerMgnt);
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		console.log('State updated!: ');
	}, [centerMgnts]);

	return (
		<CenterMgntContext.Provider
			value={{
				centerMgnts: centerMgnts,
				user: user,
				centers: centers,
				addCenterMgntElements: addCenterMgntElements,
				removeCenterMgntElements: removeCenterMgntElements,
				updateCenterMgntElements: updateCenterMgntElements,
			}}
		>
			<div style={{ width: '100%' }} id="centerMgnt">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<CenterMgntList centerMgnts={centerMgnts} onValueEditted={onValueEditted} />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddCenterMgnt
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</CenterMgntContext.Provider>
	);
};
