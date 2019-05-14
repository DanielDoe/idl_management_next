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
	let child = new BrowserWindow({ show: false });
	child.loadURL(`file:///${arg.file}`);

	child.on('ready-to-show', () => {
		child.webContents.printToPDF(
			{ marginsType: 1, printBackground: true, printSelectionOnly: false, landscape: true },
			(err, data) => {
				if (err) {
					console.error(err);
				}

				writeFile(arg.save, data, error => {
					if (error) {
						console.error(error);
					}
					console.log('PDF written');
					child.close();
				});
			}
		);
	});
});

app.on('window-all-closed', () => {
	app.quit();
});
