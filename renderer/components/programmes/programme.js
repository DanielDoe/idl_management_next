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
		// let newValues = [...venues, venue];
		// console.log('Venues: ', newValues);
		// setProgrammes(newValues);
		console.log("Adding Programmes", programme);
	};

	const removeProgrammeElements = programme => {
		console.log('Removing Programmes', programme);
	};

	const updateProgrammeElements = programme => {
		console.log('Updating Programmes', programme);
	};

	const onValueEditted = value => {
		console.log(value)
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		console.log('State updated!: ');
	}, [programmes]);

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
				name: element[1]
			})
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
      }


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
