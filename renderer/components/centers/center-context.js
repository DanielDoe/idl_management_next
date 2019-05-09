import React from 'react';

export default React.createContext({
	centers: [
		{
			name: 'Accra',
			code: 'ACC',
			blocks: 3,
		},
		{
			name: 'Volta',
			code: 'VR',
			blocks: 3,
		},
		{
			name: 'Kumasi',
			code: 'KMA',
			blocks: 3,
		},
	],
	addCenterElements: center => {},
	removeCenterElements: center => {},
	updateCenterElements: center => {},
});
