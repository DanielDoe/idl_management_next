export default class TableGenerator {
	/**
	 * Setup the table generator.
	 * Requires the data to be rendered
	 * @param {TableEntry[]} data
	 */
	constructor(data) {
		this.data = data;
	}

	/**
	 * Retrieve the CSS Styles
	 * @returns {string}
	 */
	_getStyles() {
		return `
        .app-table {
            border-collapse: collapse;
            width: 100%;
        }
        .app-table td,
        .app-table th {
            border: 1px solid #ddd;
            padding: 0.5rem 1rem;
            font-family: Calibri, Arial, sans-serif;
            font-size: 11pt;
        }
        .app-table th {
            text-align: left;
            border-bottom-color: #aaa;
        }
        .elem-col {
            font-weight: 700;
        }
        .app-table tbody tr:nth-of-type(even) td {
            background-color: #eee;
        }
        .app-table td[rowspan] {
            background-color: transparent;
            position: relative;
        }
        .app-table td[rowspan] span {
            display: block;
            transform: rotate(-90deg);
            width: 100%;
            text-align: center;
            font-size: 22pt;
        }
        `;
	}

	/**
	 * Convert a date object to a simple ISO date string
	 * @param {Date} date
	 * TODO: Test out and use GMT Date string
	 */
	_getDateString(date) {
		let month = date.getMonth() + 1;
		month = month < 10 ? `0${month}` : month;

		return `${date.getFullYear()}-${month}-${date.getDate()}`;
	}

	_getDayOfMonth(date) {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[new Date(date).getDay()];
	}

	/**
	 * Read and retrieve the index of a particular date object.
	 * Indices are calculated based on the time of day
	 * @param {Date} date
	 */
	_getIndex(date) {
		const dateNum = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600;
		switch (dateNum) {
			case 25200: // 07:00:00
				return 2;
			case 34200:
				return 4;
			case 43200:
				return 6;
			case 52200:
				return 8;
			case 61200:
				return 10;
			default:
				return null;
		}
	}

	/**
	 * Retrieve all the dates in the data set and return them in ascending order
	 * @param {Date[]} dates
	 * @returns {string[]}
	 */
	_getUniqueDates(dates) {
		const output = dates.map(this._getDateString);
		return [...new Set(output)].sort((a, b) => new Date(a) - new Date(b));
	}

	/**
	 * Render the tbody rows
	 * @param {Object} data
	 * @param {string[]} dates
	 */
	_renderBody(data, dates) {
		let body = '';
		dates.forEach((date, index) => {
			/**
			 * @type {TableEntry[]}
			 */
			const values = data[date];

			const dayOfMonth = this._getDayOfMonth(date);
			const toFill = [date, dayOfMonth, null, '', null, '', null, '', null, '', null];

			values.forEach(value => {
				const index = this._getIndex(value.start);
				if (index) {
					toFill[index] = value.title;
				}
			});

			let tr = '';
			toFill.forEach((input, id) => {
				if (input === '' && index === 0) {
					tr += `<td rowspan="${dates.length}" class="break-col"><span>Break</span></td>`;
					return;
				}

				if (id < 2) {
					tr += `<td class="elem-col">${input}</td>`;
					return;
				}

				if (input) {
					tr += `<td>${input}</td>`;
				}

				if (input === null) {
					tr += `<td></td>`;
				}
			});

			body += `<tr>${tr}</tr>`;
		});

		return `<tbody>${body}</tbody>`;
	}

	/**
	 * Renders the HTML header
	 * @returns {string}
	 */
	_renderHeader() {
		return `<thead>
        <tr>
            <th>Date</th>
            <th>Days</th>
            <th>7:00 - 9:00</th>
            <th>9:00 - 9:30</th>
            <th>9:30 - 11:30</th>
            <th>11:30 - 12:00</th>
            <th>12:00 - 2:00</th>
            <th>2:00 - 2:30</th>
            <th>2:30 - 4:30</th>
            <th>4:30 - 5:00</th>
            <th>5:00 - 7:00</th>
        </tr>
        </thead>`;
	}

	/**
	 * Renders the data and returns an HTML output which can be saved into
	 * an HTML file inside the application's temporary folder
	 * @returns {string}
	 */
	render() {
		const dates = this._getUniqueDates(this.data.map(datum => datum.start));
		const header = this._renderHeader();
		const styles = this._getStyles();

		const reducedData = this.data.reduce((acc, curr) => {
			const key = this._getDateString(curr.start);
			const source = {
				[key]: acc[key] ? acc[key].concat(curr).sort((a, b) => a.start - b.start) : [curr]
			};

			return Object.assign(acc, source);
		}, {});

		const body = this._renderBody(reducedData, dates);

		return `
        <html>
        <head>
            <style>${styles}</style>
        </head>
        <body>
            <table class="app-table">${header}${body}</table>
        </body>
        </html>
        `;
	}
}

/**
 * @typedef {Object} TableEntry
 * @property {string} title The name of the field
 * @property {Date} start
 * @property {Date} end
 */
