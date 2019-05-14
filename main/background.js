import { writeFile } from 'fs';
import { join } from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import { createWindow, exitOnChange } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
	exitOnChange();

	const userDataPath = app.getPath('userData');
	app.setPath('userData', `${userDataPath} (development)`);
}

app.on('ready', () => {
	const mainWindow = createWindow('main', {
		width: 1000,
		height: 600
	});

	if (isProd) {
		const homeFile = join(app.getAppPath(), 'app/home/index.html');
		mainWindow.loadFile(homeFile);
	} else {
		const homeUrl = 'http://localhost:8888/home';
		mainWindow.loadURL(homeUrl);
		mainWindow.webContents.openDevTools();
	}
});

ipcMain.on('print-timetable', (_, arg) => {
	// TODO: Functionality to print the PdF
});

app.on('window-all-closed', () => {
	app.quit();
});
