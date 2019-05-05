import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ProgrammeContext from './programme-context';
import { AddProgramme } from './newProgramme';
import ProgrammeList from './programmeList';
import './programme.css';

export default () => {
	const [programmes, setProgrammes] = useState([
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

	const addProgrammeElements = programme => {
		let newValues = [...venues, venue];
		console.log('Venues: ', newValues);
		setProgrammes(newValues);
		// console.log("Adding Programmes", programme);
	};

	const removeProgrammeElements = programme => {
		console.log('Removing Programmes', programme);
	};

	const updateProgrammeElements = programme => {
		console.log('Updating Programmes', programme);
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
	}, [programmes]);

	return (
		<ProgrammeContext.Provider
			value={{
				programmes: programmes,
				addProgrammeElements: addProgrammeElements,
				removeProgrammeElements: removeProgrammeElements,
				updateProgrammeElements: updateProgrammeElements,
			}}
		>
			<div style={{ width: '100%' }} id="programme">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<ProgrammeList programmes={programmes} onValueEditted={onValueEditted} />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddProgramme
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</ProgrammeContext.Provider>
	);
};
