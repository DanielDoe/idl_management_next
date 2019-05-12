import React from 'react';

export default React.createContext({
	scripts: [],
	addScriptsElements: scripts => {},
	removeScriptsElements: scripts => {},
	updateScriptsElements: scripts => {},
});
