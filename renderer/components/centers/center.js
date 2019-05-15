import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CenterContext from './center-context';
import { AddCenters } from './newCenter';
import CenterList from './centerList';
import { dbStore } from '../_shared/initialStoreState';
import './center.css';

export default () => {
	const [centers, setCenters] = useState(dbStore.centers);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);

	const addCenterElements = center => {
		console.log('Adding centers', center);
	};

	const removeCenterElements = center => {
		console.log('Removing centers', center);
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
		console.log('State updated!: ');
	}, [centers]);

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
