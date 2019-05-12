const now = new Date();

export default [
	{
		title: 'All Day Event very long title',
		start: new Date(2015, 3, 0),
		end: new Date(2015, 3, 1)
	}
	// {
	//   id: 1,
	//   title: 'Long Event',
	//   start: new Date(2015, 3, 7),
	//   end: new Date(2015, 3, 10),
	// },

	// {
	//   id: 2,
	//   title: 'DTS STARTS',
	//   start: new Date(2016, 2, 13, 0, 0, 0),
	//   end: new Date(2016, 2, 20, 0, 0, 0),
	// },

	// {
	//   id: 3,
	//   title: 'DTS ENDS',
	//   start: new Date(2016, 10, 6, 0, 0, 0),
	//   end: new Date(2016, 10, 13, 0, 0, 0),
	// },

	// {
	//   id: 4,
	//   title: 'Some Event',
	//   start: new Date(2015, 3, 9, 0, 0, 0),
	//   end: new Date(2015, 3, 10, 0, 0, 0),
	// },
	// {
	//   id: 5,
	//   title: 'Conference',
	//   start: new Date(2015, 3, 11),
	//   end: new Date(2015, 3, 13),
	//   desc: 'Big conference for important people',
	// },
	// {
	//   id: 6,
	//   title: 'Meeting',
	//   start: new Date(2015, 3, 12, 10, 30, 0, 0),
	//   end: new Date(2015, 3, 12, 12, 30, 0, 0),
	//   desc: 'Pre-meeting meeting, to prepare for the meeting',
	// },
	// {
	//   id: 7,
	//   title: 'Lunch',
	//   start: new Date(2015, 3, 12, 12, 0, 0, 0),
	//   end: new Date(2015, 3, 12, 13, 0, 0, 0),
	//   desc: 'Power lunch',
	// },
	// {
	//   id: 8,
	//   title: 'Meeting',
	//   start: new Date(2015, 3, 12, 14, 0, 0, 0),
	//   end: new Date(2015, 3, 12, 15, 0, 0, 0),
	// },
	// {
	//   id: 9,
	//   title: 'Happy Hour',
	//   start: new Date(2015, 3, 12, 17, 0, 0, 0),
	//   end: new Date(2015, 3, 12, 17, 30, 0, 0),
	//   desc: 'Most important meal of the day',
	// },
	// {
	//   id: 10,
	//   title: 'Dinner',
	//   start: new Date(2015, 3, 12, 20, 0, 0, 0),
	//   end: new Date(2015, 3, 12, 21, 0, 0, 0),
	// },
	// {
	//   id: 11,
	//   title: 'Birthday Party',
	//   start: new Date(2015, 3, 13, 7, 0, 0),
	//   end: new Date(2015, 3, 13, 10, 30, 0),
	// },
	// {
	//   id: 12,
	//   title: 'Late Night Event',
	//   start: new Date(2015, 3, 17, 19, 30, 0),
	//   end: new Date(2015, 3, 18, 2, 0, 0),
	// },
	// {
	//   id: 12.5,
	//   title: 'Late Same Night Event',
	//   start: new Date(2015, 3, 17, 19, 30, 0),
	//   end: new Date(2015, 3, 17, 23, 30, 0),
	// },
	// {
	//   id: 13,
	//   title: 'Multi-day Event',
	//   start: new Date(2015, 3, 20, 19, 30, 0),
	//   end: new Date(2015, 3, 22, 2, 0, 0),
	// },
	// {
	//   id: 14,
	//   title: 'Today',
	//   start: new Date(new Date().setHours(new Date().getHours() - 3)),
	//   end: new Date(new Date().setHours(new Date().getHours() + 3)),
	// },
	// {
	//   id: 15,
	//   title: 'Point in Time Event',
	//   start: now,
	//   end: now,
	// },
];

/**
 * Events to test with
 */
// const data = [
// 	{ title: 'BIOL 502', start: new Date(2019, 1, 26, 7, 0, 0) },
// 	{ title: 'BIOL 502', start: new Date(2019, 1, 26, 9, 30, 0) },
// 	{ title: 'BIOL 527', start: new Date(2019, 1, 26, 12, 0, 0) },
// 	{ title: 'BIOL 525', start: new Date(2019, 1, 26, 14, 30, 0) },
// 	{ title: 'BIOL 527', start: new Date(2019, 1, 26, 17, 0, 0) },
// 	{ title: 'BIOL 502', start: new Date(2019, 1, 27, 7, 0, 0) },
// 	{ title: 'BIOL 527', start: new Date(2019, 1, 27, 9, 30, 0) },
// 	{ title: 'BIOL 525', start: new Date(2019, 1, 27, 12, 0, 0) },
// 	{ title: 'BIOL 525', start: new Date(2019, 1, 27, 14, 30, 0) },
// 	{ title: 'BIOL 502', start: new Date(2019, 2, 10, 7, 0, 0) },
// 	{ title: 'BIOL 527', start: new Date(2019, 2, 10, 9, 30, 0) },
// 	{ title: 'BIOL 525', start: new Date(2019, 2, 10, 12, 0, 0) },
// 	{ title: 'BIOL 525', start: new Date(2019, 2, 10, 14, 30, 0) },
// 	{ title: 'BIOL 502', start: new Date(2019, 2, 9, 7, 0, 0) },
// 	{ title: 'BIOL 502', start: new Date(2019, 2, 9, 9, 30, 0) },
// 	{ title: 'BIOL 527', start: new Date(2019, 2, 9, 12, 0, 0) },
// 	{ title: 'BIOL 525', start: new Date(2019, 2, 9, 14, 30, 0) },
// 	{ title: 'BIOL 527', start: new Date(2019, 2, 9, 17, 0, 0) },
// 	{ title: 'MID SEM', start: new Date(2019, 2, 23, 7, 0, 0) },
// 	{ title: 'MID SEM', start: new Date(2019, 2, 23, 9, 30, 0) },
// 	{ title: 'MID SEM', start: new Date(2019, 2, 23, 12, 0, 0) },
// 	{ title: 'MID SEM', start: new Date(2019, 2, 24, 7, 0, 0) },
// 	{ title: 'MID SEM', start: new Date(2019, 2, 24, 9, 30, 0) }
// ];
