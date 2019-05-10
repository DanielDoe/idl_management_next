import React, { useState } from 'react';
import { Login } from './login';
import LoginContext from './login-context';

export default () => {
	const [credentials, setcredentials] = useState([]);

	const addCredentialsElements = user => {
		// updatedCredentialss = Credentialss
		// setCredentialss(newCredentials);
		let newCredentials = [];
		console.log('Adding Credentialss', newCredentials);
		// setCredentialss(Credentialss.push(Credentials))
	};

	const removeCredentialsElements = user => {
		console.log('Removing Credentialss', Credentials);
	};

	const updateCredentialsElements = user => {
		console.log('Updating Credentialss', user);
	};
	return (
		<LoginContext.Provider
			value={{
				credentials: credentials,
				addCredentialsElements: addCredentialsElements,
				removeCredentialsElements: removeCredentialsElements,
				updateCredentialsElements: updateCredentialsElements,
			}}
		>
			<Login />
		</LoginContext.Provider>
	);
};
