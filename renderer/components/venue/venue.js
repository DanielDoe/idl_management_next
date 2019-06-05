import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import VenueContext from './venue-context';
import { AddVenue } from './newVenue';
import VenueList from './venueList';
import { getData, manageVenues, titleCase, routeCenters, routeVenues } from '../_shared/axiosCalls';
import './venue.css';

export default () => {
	const [venues, setVenues] = useState([]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const token = JSON.parse(localStorage.getItem('login')).tokenObtained;
	const user = JSON.parse(localStorage.getItem('login'));
	const headers = {
		'x-access-token': token,
		'content-type': 'application/json',
	};
	const [centers, setcenters] = useState([]);

	useEffect(() => {
		// Get all the centers we need
		getData({ url: routeCenters, headers }).then(res => {
			res.centers !== undefined ? setcenters(res.centers) : setcenters([]);
		});

		getData({ url: routeVenues, headers }).then(data => {
			console.log(data.venues)
			data.venues !== undefined ? setVenues(data.venues) : setVenues([]);
		});
	}, []);

	const addVenueElements = venue => {
		const { venue_name, venue_capacity, center_name } = venue;
		let newstate = {
			venue_name: titleCase(venue_name).trim(),
			venue_capacity: venue_capacity,
			center_name: center_name,
		};

		manageVenues({ ...newstate, url: routeVenues, headers, type: 'post' }).then(res =>
			setVenues(res.data.venues)
		);
	};

	const removeVenueElements = venue => {
		manageVenues({ ...venue, url: routeVenues, headers, type: 'delete' });
		const newVenue = venues.filter(
			element => element.venue_id !== venue.venue_id
		);
		setVenues(newVenue);
	};

	const updateVenueElements = venue => {
		const { venue_name, venue_capacity, center_name } = venue;
		let newstate = {
			venue_name: titleCase(venue_name).trim(),
			venue_capacity: venue_capacity,
			center_name: center_name,
		};
		manageVenues({ ...newstate, url: routeVenues, headers, type: 'put' });
		const update = venues.map(element =>
			element.center_name === venue.center_name && element.venue_name === venue.venue_name ? venue : element
		);
		// add update to the existing state
		setVenues(update);
	};

	const onVenueEditted = venue => {
		seteditMode(true);
		setfieldData(venue);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	return (
		<VenueContext.Provider
			value={{
				venues: venues,
				user: user,
				centers: centers,
				addVenueElements: addVenueElements,
				removeVenueElements: removeVenueElements,
				updateVenueElements: updateVenueElements,
			}}
		>
			<div style={{ width: '100%' }} id="venue">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<VenueList venues={venues} centers={centers} onVenueEditted={onVenueEditted} />
						</Col>
						<Col
							span={8}
							style={{
								height: '100%',
								borderLeft: '1px solid rgba(0,0,0,0.12)',
							}}
						>
							<AddVenue
								editMode={editMode}
								centers={centers}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								onVenueEditted={onVenueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</VenueContext.Provider>
	);
};
