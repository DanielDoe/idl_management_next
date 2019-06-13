import React, { useState, useEffect } from 'react';
import TeachingTable from './teachingTable';
import {
	routeCenters,
	getData,
	routeAllocations,
	routeCourses,
	routeProgrammeCenters,
	routeVenues,
	routeTimeTableItem,
	manageTeachingTimetable,
	manageTeachingTimetableItem,
	routeTeachingTimeTable,
} from '../_shared/axiosCalls';
import { Row, Col, Modal } from 'antd';
import TeachingContext from './teaching-context';
import { AddTeaching } from './newTimetable';
import TimetableList from './timetables';
import swal from 'sweetalert';
import './teaching.css';

const confirm = Modal.confirm;
export default () => {
	const [centers, setcenters] = useState([]);
	const [courses, setcourses] = useState([]);
	const [programmes, setprogrammes] = useState([]);
	const [venues, setvenues] = useState([]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const [dataSource, setdataSource] = useState([]);
	const [events, setevents] = useState([]);
	const [user, setuser] = useState(JSON.parse(localStorage.getItem('login')));
	const [activeSelection, setactiveSelection] = useState('timetable');
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};

	const addTeachingElements = teaching => {
		console.log(teaching);
		const { center_id, prog_cen_id, semester } = teaching;
		let data = programmes.filter(elem => elem.prog_cen_id === prog_cen_id && elem.center_id === center_id);
		if (data.length !== 0) {
			manageTeachingTimetable({
				center_id,
				prog_cen_id,
				semester,
				url: routeTeachingTimeTable,
				headers,
				type: 'post',
			}).then(
				res => setdataSource(res.data.timetables)
				// console.log(res)
			);
			swal({
				title: 'Good job!',
				text: 'Timetable added successfully!',
				icon: 'success',
				timer: 1000,
			});
		} else {
			swal({
				title: 'Sorry!',
				text: 'No allocation was found for selected center!',
				icon: 'error',
				timer: 3000,
			});
		}
	};

	const addTimetableItem = item => {
		manageTeachingTimetableItem({ ...item, url: routeTimeTableItem, headers, type: 'post' }).then(res => {
			const details = res.timetabledetail[0];
			let newSlot = res.timetableitems.map(element => {
				return {
					date: moment(element.date).format('ll'),
					timetable_id: details.timetable_id,
					title: element.item_title,
					course_id: element.course_id,
					venue_id: element.venue_id,
					block: element.block,
					start: moment(element.start_time).toDate(),
					end: moment(element.end_time).toDate(),
				};
			});

			setevents(newSlot);
		});
		console.log(res);
		console.log('added slots: ', item);
	};

	const removeTimetableItem = item => {
		console.log(item);
	};

	const updateTimetableItem = item => {
		console.log(item);
	};

	const removeTeachingElements = teaching => {
		const { prog_cen_id, timetable_id, semester } = teaching;
		confirm({
			title: 'Are you sure delete this item?',
			content: 'Your current timetable will be delete',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				manageTeachingTimetable({
					prog_cen_id,
					timetable_id,
					semester,
					url: routeTeachingTimeTable,
					headers,
					type: 'delete',
				});
				const newState = dataSource.filter(element => element.timetable_id !== timetable_id);
				setdataSource(newState);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
		// console.log('teaching', prog_cen_id);
	};

	const updateTeachingElements = teaching => {
		console.log('teaching', teaching);
	};

	// const Main = ({ activeSection }) => (
	//   <React.Fragment>
	//     <TimetableList activeSection={activeSection} />
	//     <TeachingTable activeSection={activeSection} />
	//   </React.Fragment>
	// );

	useEffect(() => {
		getData({ url: routeCenters, headers }).then(data => {
			data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
			//   console.log(data);
		});

		getData({ url: routeProgrammeCenters, headers }).then(data => {
			data.programmeCenterAllocations !== undefined
				? setprogrammes(data.programmeCenterAllocations)
				: setprogrammes([]);
		});

		getData({ url: routeVenues, headers }).then(data => {
			data.venues !== undefined ? setvenues(data.venues) : setvenues([]);
			//   console.log(data);
		});

		getData({ url: routeCourses, headers }).then(data => {
			data.courses !== undefined ? setcourses(data.courses) : setcourses([]);
			//   console.log(data);
		});

		getData({ url: routeTeachingTimeTable, headers }).then(data => {
			data.timetables !== undefined ? setdataSource(data.timetables) : setdataSource([]);
			console.log(data);
		});

		// getData({ url: routeTimeTableItem, headers }).then(data => {
		// 	//data.timetables !== undefined ? setdataSource(data.timetables) : setdataSource([]);
		// 	console.log(data);
		// });

		return () => {
			console.log('Unmounted component');
		};
	}, []);

	const renderContent = () => {
		switch (activeSelection) {
			case 'timetable':
				return (
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<TimetableList
								venues={venues}
								centers={centers}
								programmes={programmes}
								dataSource={dataSource}
								user={user}
								onButtonPressed={onButtonPressed}
								onItemRemove={removeTeachingElements}
								onValueEditted={onValueEditted}
							/>
						</Col>
						<Col
							span={8}
							style={{
								height: '100%',
								borderLeft: '1px solid rgba(0,0,0,0.12)',
							}}
						>
							<AddTeaching
								editMode={editMode}
								centers={centers}
								user={user}
								fieldData={fieldData}
								programmes={programmes}
								onCancel={triggerEditmode}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				);
			case 'timetable-content':
				return (
					<TeachingTable
						centers={centers}
						venues={venues}
						events={events}
						courses={courses}
						fieldData={fieldData}
						user={user}
						onButtonPressed={onButtonPressed}
						programmes={programmes}
					/>
				);
			default:
				break;
		}
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const onButtonPressed = (selection, details) => {
		// const { name } = e.target;
		setactiveSelection(selection);
		console.log(details);
		setfieldData(details);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	return (
		<TeachingContext.Provider
			value={{
				venues: venues,
				user: user,
				events: events,
				centers: centers,
				programmes: programmes,
				dataSource: dataSource,
				addTimetableItem: addTimetableItem,
				removeTimetableItem: removeTimetableItem,
				updateTimetableItem: updateTimetableItem,
				addTeachingElements: addTeachingElements,
				removeTeachingElements: removeTeachingElements,
				updateTeachingElements: updateTeachingElements,
			}}
		>
			<div id="teaching" className="teaching-container">
				<div style={{ paddingTop: '1rem', height: '100%' }}>{renderContent()}</div>
			</div>
		</TeachingContext.Provider>
	);
};
