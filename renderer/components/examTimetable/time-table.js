import React, { useState, useEffect, useContext } from 'react';
import eventELements from './events';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);

export default props => {
	const [events, setEvents] = useState(eventELements);

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

	const handleSelect = ({ start, end }) => {
		const title = window.prompt('New Event name');
		if (title)
			// this.setState({
			//   events: [
			//     ...this.state.events,
			//     {
			//       start,
			//       end,
			//       title,
			//     },
			//   ],
			// })
			setEvents(...events, { start, end, title });
	};

	const resizeEvent = ({ event, start, end }) => {
		const nextEvents = events.map(existingEvent => {
			return existingEvent.id == event.id ? { ...existingEvent, start, end } : existingEvent;
		});

		setEvents(nextEvents);

		//alert(`${event.title} was resized to ${start}-${end}`)
	};

	const newEvent = event => {
		// let idList = events.map(a => a.id);
		// let newId = Math.max(...idList) + 1;
		// let hour = {
		// 	id: newId,
		// 	title: 'New Event',
		// 	allDay: event.slots.length == 1,
		// 	start: event.start,
		// 	end: event.end,
		// };

    // setEvents(events.concat([hour]));
    // setEvents(...events, { start, end, title });
    console.log(event);
	};

	return (
		<DragAndDropCalendar
			selectable
			localizer={localizer}
			events={events}
			onEventDrop={(e) => moveEvent(e)}
			resizable
			onEventResize={(e) => resizeEvent(e)}
			onSelectSlot={(e) => handleSelect(e)}
			onDragStart={console.log}
			defaultView={BigCalendar.Views.WEEK}
			defaultDate={new Date(2015, 3, 12)}
		/>
	);
};
