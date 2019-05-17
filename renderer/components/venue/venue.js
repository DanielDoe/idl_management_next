import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import VenueContext from './venue-context';
import { AddVenue } from './newVenue';
import VenueList from './venueList';
import './venue.css';

export default () => {
	const [venues, setVenues] = useState([
		{
			center: 'Accra',
			name: 'Block 2',
			capacity: 50,
		},
		{
			center: 'Accra',
			name: 'Block 2',
			capacity: 50,
		},
		{
			center: 'Accra',
			name: 'Block 2',
			capacity: 50,
		},
	]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);
	const [user, setuser] = useState(JSON.parse(localStorage.getItem('login')))

	const [centers, setCenters] = useState(
		// get request to the db for available venues
		[
			{
				name: 'Accra',
				code: 'ACC',
			},
			{
				name: 'Volta',
				code: 'VR',
			},
			{
				name: 'Kumasi',
				code: 'KMA',
			},
		]
	);

	useEffect(() => {
		console.log('State updated!: ');
	}, []);

	const addVenueElements = venue => {
		setVenues([...venues, venue]);
		// console.log("Adding venue:", venue);
	};

	const removeVenueElements = venue => {
		console.log('Removing venue', venue);
		const newVenue = venues.filter(element => (element.center !== venue.center && element.venue_name !== venue.venue_name));
		setCenters(newVenue);
	};

	const updateVenueElements = venue => {
		console.log('Updating venue', venue);
		const newstate = venues.map(element => ((element.center === venue.center && element.venue_name === venue.venue_name) ? venue : element));
		// add update to the existing state
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
							<VenueList venues={venues} onVenueEditted={onVenueEditted} />
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
