import { resolve as resolvePath } from 'path';
import React, { useState, useEffect, useContext } from 'react';
import TeachingContext from './teaching-context';
import { remote, ipcRenderer } from 'electron';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { Select, Modal, Row, Col, Button, Icon } from 'antd';
import swal from 'sweetalert';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import { manageTeachingTimetableItem, routeTimeTableItem } from '../_shared/axiosCalls';
import TableGenerator from '../../helpers/TableGenerator';
import PdfGenerator from '../../helpers/PdfGenerator';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);
const Option = Select.Option;
export default props => {
	const [events, setEvents] = useState([]);
	const [visible, setvisible] = useState(false);
	const [updateEvent, setUpdateEvent] = useState([]);
	const [course, setcourse] = useState('');
	const [venue, setvenue] = useState('');
	const [center, setcenter] = useState(props.user.auth_status !== 'admin' ? props.user.center_id : null);
	const [programme, setprogramme] = useState(props.programmes.programme_id);
	const [semester, setsemester] = useState(props.programmes.semester);
	const [block, setblock] = useState('');
	const context = useContext(TeachingContext);
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};

	const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
		const idx = events.indexOf(event);
		let allDay = event.allDay;

		if (!event.allDay && droppedOnAllDaySlot) {
			allDay = true;
		} else if (event.allDay && !droppedOnAllDaySlot) {
			allDay = false;
		}

		const updatedEvent = { ...event, start, end, allDay };

		const nextEvents = [...events];
		nextEvents.splice(idx, 1, updatedEvent);

		setEvents(nextEvents);
		// alert(`${event.title} was dropped onto ${updatedEvent.start}`)
	};

	useEffect(() => {
		manageTeachingTimetableItem({
			timetable_id: props.fieldData.timetable_id,
			url: routeTimeTableItem,
			headers,
			type: 'get',
		}).then(res => {
			// setEvents(res.data.timetableitems);
			console.log('events: ', res.timetableitems);
		});
	}, []);

	useEffect(() => {
		return () => {
			console.log('Unmounted');
		};
	}, []);

	const handleSelect = e => {
		console.log('event: ', e);
		setvisible(true);
		// update the events state
		setUpdateEvent(e);
	};

	const handleOk = () => {
		// console.log('event: ', updateEvent);
		const { start, end, id, allDay } = updateEvent;
		let venue_data = props.venues.filter(element => element.venue_id === venue)[0];
		if (venue === '' && course === '' && block === '' && venue_data === undefined) {
			swal({
				title: 'We are sorry!',
				text: 'no venue, course and center was selected!',
				icon: 'error',
				timer: 3000,
				// button: "cancel"
			});
		} else {
			let title = course + ' ' + venue_data.venue_name;
			let programme_data = props.programmes.filter(element => element.programme_id === programme)[0];
			let addedCourse = props.courses.filter(element => element.course_title === course.split(' ')[0])[0];
			if (props.fieldData.capacity > venue_data.venue_capacity) {
				swal({
					title: 'We are sorry!',
					text: 'venue capacity is less than Programme capacity!',
					icon: 'error',
					timer: 3000,
					// button: "cancel"
				});
				// swal("Error!", "Venue capacity is less than Programme capacity!", "error");
			} else {
				context.addTimetableItem({
					timetable_id: `${props.fieldData.timetable_id}`,
					start_time: start,
					date: moment(start, 'L'),
					end_time: end,
					timetable_item_title: title,
					course_id: addedCourse.course_id,
					venue_id: venue,
					programme: props.fieldData.programme_id,
					semester: props.fieldData.semester,
					block: block,
				});
				// setEvents([
				//   ...events,
				//   {
				//     start,
				//     end,
				//     title,
				//     course,
				//     venue,
				//     programme,
				//     center,
				//     semester,
				//     block,
				//   },
				// ]);
				swal({
					title: 'Good job!',
					text: 'Time allocated successfully!',
					icon: 'success',
					// button: "OK!",
					timer: 1000,
				});
				setvisible(false);
			}
		}
	};

	const handleCancel = () => {
		// this.setState({
		//   visible: false,
		// });
		setvisible(false);
		// console.log("updated events", updateEvent);
	};

	const resizeEvent = ({ event, start, end }) => {
		const nextEvents = events.map(existingEvent => {
			return existingEvent.id == event.id && existingEvent.title == event.title
				? { ...existingEvent, start, end }
				: existingEvent;
		});

		setEvents(nextEvents);
	};

	const renderCenterData = () => {
		const centers = props.centers.map((element, index) => {
			// console.log(element.name);
			return (
				<Option value={element.center_id} key={element.center_name + index}>
					{element.center_name}
				</Option>
			);
		});

		return centers;
	};

	// const renderProgramData = () => {
	// 	const programmes = props.programmes
	// 		.filter(element => element.center_id === props.user.center_id)
	// 		.map((element, index) => {
	// 			// console.log(element.name);
	// 			return (
	// 				<Option value={element.programme_id} key={element.name + element.year}>
	// 					{element.programme_name}
	// 				</Option>
	// 			);
	// 		});

	// 	return programmes;
	// };

	const renderCourseData = () => {
		if (props.fieldData.semester === 1) {
			// console.log("course data: ", element);
			return props.programmes
				.filter(
					element =>
						element.programme_id === props.fieldData.programme_id &&
						element.center_id === props.fieldData.center_id
				)[0]
				.sem_1.map((elem, id) => {
					console.log('course: ', elem);
					return (
						<Option value={elem} key={elem + id}>
							{elem}
						</Option>
					);
				});
		}
		if (semester == 2) {
			return props
				.programmesfilter(
					element =>
						element.programme_id === props.fieldData.programme_id &&
						element.center_id === props.fieldData.center_id
				)[0]
				.sem_2.map((elem, id) => {
					console.log('course: ', elem);
					return (
						<Option value={elem} key={elem + id}>
							{elem}
						</Option>
					);
				});
		}
	};

	const renderVenueData = () => {
		const venues = props.venues
			.filter(element => element.center_id === props.fieldData.center_id)
			.map((element, index) => {
				// console.log(element.name);
				return (
					<Option value={element.venue_id} key={element.id}>
						{element.venue_name}
					</Option>
				);
			});

		return venues;
	};

	// delete event
	const onSelectEvent = pEvent => {
		const newEvents = events;
		const idx = events.indexOf(pEvent);

		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this schedule allocation!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				// swal("Poof! Your imaginary file has been deleted!", {
				// 	icon: "success",
				// });
				newEvents.splice(idx, 1);
			}
			//  else {
			// 	swal("Your imaginary file is safe!");
			// }
		});
		setEvents(newEvents);
	};

	// PRINT EVENT
	const handleClick = event => {
		const currWindow = remote.getCurrentWindow();
		const defaultPath = resolvePath(remote.app.getPath('documents'), 'timetable.pdf');
		const options = {
			title: 'Save timetable',
			defaultPath,
			filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
		};

		// Retrieve the save path
		const filename = remote.dialog.showSaveDialog(currWindow, options);
		const tableGenerator = new TableGenerator(events);
		const html = tableGenerator.render();

		// Save to the PDF point
		const pdfGenerator = new PdfGenerator(filename, html);
		pdfGenerator
			.writeToFile()
			.then(file => {
				ipcRenderer.send('print-timetable', { file, save: filename });
			})
			.catch(error => console.error(error));
		// pdfGenerator
		// 	.savePdf()
		// 	.then(() => console.log('Saved to PDF'))
		// 	.catch(error => console.error(error));
	};
	const min = new Date();
	min.setHours(7);
	min.setMinutes(0, 0, 0);

	const max = new Date();
	max.setHours(19);
	max.setMinutes(0, 0, 0);

	return (
		<div style={{ height: '100%' }}>
			<Modal
				title="Add new schedule"
				className="new-schedule"
				visible={visible}
				onOk={e => handleOk(e)}
				onCancel={e => handleCancel(e)}
			>
				<label htmlFor="new-schedule-course">Course</label>
				<Select
					// defaultValue="course"
					className="new-schedule-select"
					onChange={e => setcourse(e)}
				>
					{renderCourseData()}
				</Select>
				<label htmlFor="new-schedule-venue">Venue</label>
				<Select
					// defaultValue="Accra"
					className="new-schedule-select"
					onChange={e => setvenue(e)}
				>
					{renderVenueData()}
				</Select>
				<label htmlFor="new-schedule-block">Block</label>
				<Select placeholder="Block one" className="new-schedule-select" onChange={e => setblock('one')}>
					<Option value="one">one</Option>
					<Option value="two">two</Option>
					<Option value="three">three</Option>
				</Select>
			</Modal>
			<div style={{ height: '100%', width: '100%' }}>
				<Row gutter={24}>
					<Col span={6}>
						{/* <Select
              className="exam-selector"
              defaultValue={
                props.user.auth_status !== "admin" ? props.user.center : null
              }
              disabled={props.user.auth_status !== "admin" ? true : false}
              onChange={e => setcenter(e)}
            >
              {renderCenterData()}
            </Select> */}
						<Button onClick={() => props.onButtonPressed('timetable', [])}>
							<Icon type="left" />
							Go back
						</Button>
					</Col>
					<Col span={6}>
						<Select
							defaultValue={props.user.auth_status !== 'admin' ? props.user.center : null}
							className="exam-selector"
							// value={props.user.auth_status !== "admin" ? props.user.center : null}
							disabled={props.user.auth_status !== 'admin' ? true : false}
							onChange={e => setcenter(e)}
						>
							{renderCenterData()}
						</Select>
					</Col>
					<Col span={6}>
						<Select placeholder="Semester" className="exam-selector" onChange={e => setsemester(e)}>
							<Option value="1">1</Option>
							<Option value="2">2</Option>
						</Select>
					</Col>
					<Col span={6}>
						<Select placeholder="Block one" className="exam-selector" onChange={e => setblock('one')}>
							<Option value="one">one</Option>
							<Option value="two">two</Option>
							<Option value="three">three</Option>
						</Select>
					</Col>
				</Row>
				<DragAndDropCalendar
					className="big-calender-exams"
					selectable
					localizer={localizer}
					events={events}
					min={min}
					max={max}
					onEventDrop={e => moveEvent(e)}
					resizable
					onEventResize={e => resizeEvent(e)}
					onSelectSlot={e => handleSelect(e)}
					onSelectEvent={e => onSelectEvent(e)}
					onDragStart={console.log}
					views={['month', 'week', 'day']}
					defaultView={BigCalendar.Views.WEEK}
					defaultDate={new Date(2015, 3, 12)}
				/>

				<Row gutter={16}>
					<Col span={4} />
					<Col span={4} />
					<Col span={4} />
					<Col span={4} />
					<Col span={4}>
						<Button type="primary" icon="save" style={{ width: '100%' }}>
							Save
						</Button>
					</Col>
					<Col span={4}>
						<Button type="primary" icon="printer" style={{ width: '100%' }} onClick={handleClick}>
							Print
						</Button>
					</Col>
				</Row>
			</div>
		</div>
	);
};
