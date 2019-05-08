import React, { useState, useEffect, useContext } from 'react';
import eventELements from './events';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { Select, Modal } from 'antd';
import swal from '@sweetalert/with-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);
const Option = Select.Option;

export default props => {
	const [events, setEvents] = useState(eventELements);
	const [visible, setvisible] = useState(false);
	const [updateEvent, setUpdateEvent] = useState([]);
	const [course, setcourse] = useState('');
	const [venue, setvenue] = useState('');

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
		console.log('NewEvents: ', events);
	}, [events, course, venue]);

	const handleCourseChange = value => {
		// console.log(`selected ${value}`);
		setcourse(value)
	};

	const handleVenueChange = value => {
		// console.log(`selected ${value}`);
		setvenue(value);
	};

	const handleSelect = e => {
		setvisible(true);
		setUpdateEvent(e);
	};

	const resizeEvent = ({ event, start, end }) => {
		const nextEvents = events.map(existingEvent => {
			return existingEvent.id == event.id ? { ...existingEvent, start, end } : existingEvent;
		});

		setEvents(nextEvents);
	};

	const handleOk = () => {
		setvisible(false);
		const { start, end } = updateEvent;
		let title = course+ ' ' +venue
		// console.log("updated events", start, end);
		setEvents([...events, { start, end, title }]);
	};

	const handleCancel = () => {
		// this.setState({
		//   visible: false,
		// });
		setvisible(false);
		console.log('updated events', updateEvent);
	};

	//make calender responsive!!!!

	return (
		<div>
			<Modal title="Add new schedule" visible={visible} onOk={(e) => handleOk(e)} onCancel={(e) => handleCancel(e)}>
				<Select defaultValue="lucy" style={{ width: 120 }} onChange={(e) => handleCourseChange(e)}>
					<Option value="jack">Jack</Option>
					<Option value="lucy">Lucy</Option>
					<Option value="disabled" disabled>
						Disabled
					</Option>
					<Option value="Yiminghe">yiminghe</Option>
				</Select>
				<Select defaultValue="lucy" style={{ width: 120 }} onChange={(e) => handleVenueChange(e)}>
					<Option value="jack">Jack</Option>
					<Option value="lucy">Lucy</Option>
					<Option value="disabled" disabled>
						Disabled
					</Option>
					<Option value="Yiminghe">yiminghe</Option>
				</Select>
			</Modal>
			<DragAndDropCalendar
				selectable
				localizer={localizer}
				events={events}
				onEventDrop={e => moveEvent(e)}
				resizable
				onEventResize={e => resizeEvent(e)}
				onSelectSlot={e => handleSelect(e)}
				onDragStart={console.log}
				defaultView={BigCalendar.Views.WEEK}
				defaultDate={new Date(2015, 3, 12)}
			/>
		</div>
	);
};
