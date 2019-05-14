import { remote, webContents } from 'electron';
import { writeFile } from 'fs';
import { resolve } from 'path';

export default class PdfGenerator {
	html;
	filename;

	constructor(filename, html) {
		this.html = html;
		this.filename = filename;
	}

	async writeToFile() {
		const tempFile = resolve(remote.app.getPath('temp'), 'timetable.html');
		return new Promise((resolve, reject) => {
			writeFile(tempFile, this.html, err => {
				if (err) {
					reject(err);
					return;
				}

				resolve(tempFile);
			});
		});
	}
}
