import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ScriptList from './examscriptstable';
import ScriptContext from './script-context';
import { AddScript } from './newScripts';

export default () => {
	const [scripts, setScripts] = useState([
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
	]);
	const [editMode, seteditMode] = useState(false);
	const [fieldData, setfieldData] = useState([]);

	const addScriptElements = script => {
		// updatedScripts = centers
		// setScripts(newScript);
		let newScript = [];
		console.log('Adding centers', newScript);
		// setScripts(centers.push(center))
	};

	const removeScriptElements = script => {
		console.log('Removing scripts', script);
	};

	const updateScriptElements = script => {
		console.log('Updating scripts', script);
	};

	const onValueEditted = value => {
		seteditMode(true);
		setfieldData(value);
	};

	const triggerEditmode = () => {
		seteditMode(false);
	};

	return (
		<ScriptContext.Provider
			value={{
				scripts: scripts,
				addScriptElements: addScriptElements,
				removeScriptElements: removeScriptElements,
				updateScriptElements: updateScriptElements,
			}}
		>
			<div style={{ width: '100%' }} id="script">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<ScriptList scripts={scripts} onValueEditted={onValueEditted} />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddScript
								editMode={editMode}
								onCancel={triggerEditmode}
								fieldData={fieldData}
								//onListUpload={openFileDialog}
								onValueEditted={onValueEditted}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</ScriptContext.Provider>
	);
};
