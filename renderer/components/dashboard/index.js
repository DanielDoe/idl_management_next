import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
// import { NotFound } from './Errors'

import { createMemoryHistory } from 'history';
import CenterPage from '../centers'
import { First, Second, Third } from './routePages';
import Dashboard from './dashboard';

const history = createMemoryHistory();

export default class extends Component {
	state = {
		routes: [
			{
				key: 1,
				exact: true,
				path: '/exam',
				name: 'Exam Timetable',
				component: First,
				icon: 'All mail',
			},
			{
				key: 2,
				exact: true,
				path: '/teaching',
				name: 'Teaching Timetable',
				component: Second,
				icon: 'Trash',
			},
			{
				key: 3,
				exact: true,
				path: '/center_m',
				name: 'Center Management',
				component: Third,
				icon: 'Spam',
			},
		],
		sub_routes: [
			{
				key: 1,
				exact: true,
				path: '/center',
				name: 'Centers',
				component: CenterPage,
				icon: 'All mail',
			},
			{
				key: 2,
				exact: true,
				path: '/programme',
				name: 'Programmes',
				component: Second,
				icon: 'Trash',
			},
			{
				key: 3,
				exact: true,
				path: '/course',
				name: 'Courses',
				component: Third,
				icon: 'Spam',
			},
			{
				key: 4,
				exact: true,
				path: '/users',
				name: 'Users',
				component: Third,
				icon: 'Spam',
			},
		]
	};

	//<Route component={NotFound} />

	render() {
		const { routes, sub_routes } = this.state;

		return (
			<Router history={history}>
				<Switch>
					<Dashboard routes={routes} sub_routes={sub_routes}>
						<Route path="/first" render={() => <First />} />
						<Route path="/second" render={() => <Second />} />
						<Route path="/third" render={() => <Third />} />
					</Dashboard>
				</Switch>
			</Router>
		);
	}
}
