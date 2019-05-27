import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { getData, manageCourseAllocations } from '../_shared/axiosCalls';
import AllocationContext from './allocation-context';
import { AddAllocation } from './newAllocation';
import AllocationList from './allocationList';
import './allocation.css';

export default () => {
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};
	const routeProgrammes = 'http://10.30.3.17:5000/programme';
	const routeCourses = 'http://10.30.3.17:5000/course';
	const routeURL = 'http://10.30.3.17:5000/courseAllocation';
	const [allocations, setAllocations] = useState([]);

	// sample data from the api
	const data = [
		{
			programme_id: 72,
			programme_name: 'Computer Engineering 1',
			sem_1: ['Coe COE'],
			sem_2: ['Digital Systems COE 252'],
		},
	];
	const [programmes, setprogrammes] = useState([]);
	const [courses, setcourses] = useState([]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const addAllocationElements = allocation => {
		console.log('Allocation: ', allocation);
		// const { programme_name, sem_1, sem_2 } = allocation;
		// let newstate = {
		// 	programme_id: '72',
		// 	sem_1: ,
		// 	sem_2: ,
		// };
		manageCourseAllocations({ ...allocation, url: routeURL, headers, type: 'post' }).then(res => {
			setAllocations(res.data.courseAllocations);
			// console.log(res);
		});
		// setAllocations(Allocations.push(Allocation))
	};

	const removeAllocationElements = allocation => {
		console.log(allocation);
		manageCourseAllocations({ ...allocation, url: routeURL, headers, type: 'delete' });
		const newState = allocations.filter(element => element.programme_id !== allocation.programme_id);
		setAllocations(newState);
	};

	const updateAllocationElements = allocation => {
		console.log('Updating Allocations', allocation);
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	useEffect(() => {
		// console.log("State updated!: ");
		// getData({ url: routeProgrammes, headers }).then(data => {
		// 	data.programmes !== undefined ? setprogrammes(data.programmes) : setProgrammes([]);
		// });
		// getData({ url: routeCourses, headers }).then(data => {
		// 	data.courses !== undefined ? setcourses(data.courses) : setcourses([]);
		// });
		// getData({ url: routeURL, headers }).then(data => {
		// 	// console.log('Allocations: ', data)
		// 	data.courseAllocations !== undefined ? setAllocations(data.courseAllocations) : setAllocations([]);
    // });
    setAllocations(data)
	}, []);

	return (
		<AllocationContext.Provider
			value={{
				allocations: allocations,
				programmes: programmes,
				courses: courses,
				addAllocationElements: addAllocationElements,
				removeAllocationElements: removeAllocationElements,
				updateAllocationElements: updateAllocationElements,
			}}
		>
			<div style={{ width: '100%' }} id="allocation">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<AllocationList allocations={allocations} onValueEditted={onValueEditted} />
						</Col>
						<Col
							span={8}
							style={{
								height: '100%',
								borderLeft: '1px solid rgba(0,0,0,0.12)',
							}}
						>
							<AddAllocation
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</AllocationContext.Provider>
	);
};
