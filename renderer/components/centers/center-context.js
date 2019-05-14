import React from 'react';
import { dbStore } from '../_shared/initialStoreState';

export default React.createContext({
	// make get request to get centers
	centers: dbStore.centers,
	addCenterElements: center => {},
	removeCenterElements: center => {},
	updateCenterElements: center => {},
});
