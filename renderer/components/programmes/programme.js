import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ProgrammeContext from './programme-context';
import { AddProgramme } from './newProgramme';
import ProgrammeList from './programmeList';
import XLSX from 'xlsx';
import './programme.css';

export default () => {
	const Dialog = require('electron').remote.dialog;
	const [programmes, setProgrammes] = useState([
		// {
		// 	programme_code: 'bme',
		// 	programme_initial: 1,
		// 	programme_name: 'biomed',
		// 	programme_year: 4,
		// },
	]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
  const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
	const addProgrammeElements = programme => {
		// let newValues = [...venues, venue];
		// console.log('Venues: ', newValues);
		// for (let index = 1; index <=  programme.programme_year; index++) {
		// 	const newstate = {
		// 		programme_code: (programme.programme_code).toUpperCase(),
		// 		programme_initial: programme.programme_initial,
		// 		programme_name: titleCase(programme.programme_name),
		// 		programme_year: ,
    //   };
    //   console.log(newstate);
		// 	setProgrammes([...programmes, newstate]);
    // }
    let newstate = {
      programme_code: (programme.programme_code).toUpperCase(),
				programme_initial: programme.programme_initial,
				programme_name: titleCase(programme.programme_name),
				programme_year: programme.programme_year,
    }
		setProgrammes([...programmes, newstate]);
		// console.log('Adding Programmes', [...programmes, programme]);
	};

	const removeProgrammeElements = programme => {
		const newState = programmes.filter(
			element =>
				element.programme_name !== programme.programme_name &&
				element.programme_code !== programme.programme_code
		);
		setProgrammes(newState);
		// console.log("Removing Programmes", newState);
	};

	const updateProgrammeElements = programme => {
		// console.log("Updating Programmes", programme);
		const newstate = programmes.map(element =>
			element.programme_name !== programme.programme_name && element.programme_code !== programme.programme_code
				? programme
				: element
		);
		setCenters(newstate);
	};

	const onValueEditted = value => {
		console.log(value);
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		console.log('State updated!: ');
	}, []);

	const openFileDialog = year => {
		console.log(year);
		const o = Dialog.showOpenDialog({ properties: ['openFile'] });
		const workbook = XLSX.readFile(o[0]);

		const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

		const newData = data
			.filter((array, i) => array.length > 0 && i > 0)
			.map(element => {
				// console.log(element);
				addProgrammeElements({
					code: element[0],
					name: element[1],
				});
				// addStaff({
				//   name: element[1],
				//   member,
				//   status: element[2],
				// });
				// return this.props.teacherAdded({
				//     name: element[1],
				//     member,
				//     status: element[2],
				// });
				//add function here
			});
	};

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
						<Col
							span={8}
							style={{
								height: '100%',
								borderLeft: '1px solid rgba(0,0,0,0.12)',
							}}
						>
							<AddProgramme
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onListUpload={openFileDialog}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</ProgrammeContext.Provider>
	);
};
