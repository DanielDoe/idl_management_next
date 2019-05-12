import React from 'react';

export default React.createContext({
	user: [],
	centerMgnts: [
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
		,
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
	],
	addProgrammeElements: programme => {},
	removeProgrammeElements: programme => {},
	updateProgrammeElements: programme => {},
});
