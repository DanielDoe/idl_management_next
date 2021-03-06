import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
// import { NotFound } from './Errors'
import MailIcon from '@material-ui/icons/Mail';
import { createMemoryHistory } from 'history';
import CenterPage from '../centers';
import { First, Second, Third } from './routePages';
import Domain from '@material-ui/icons/Domain';
import Group from '@material-ui/icons/Group';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LocationCity from '@material-ui/icons/LocationCity';
import GroupAdd from '@material-ui/icons/GroupAdd'
import FileCopy from '@material-ui/icons/FileCopy';
import Description from '@material-ui/icons/Description';
import FolderOpen from '@material-ui/icons/FolderOpen';
import DateRange from '@material-ui/icons/DateRange';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
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
				icon: DateRange,
			},
			{
				key: 2,
				exact: true,
				path: '/teaching',
				name: 'Teaching Timetable',
				component: Second,
				icon: DateRange,
			},
		],
		sub_routes: [
			{
				key: 1,
				exact: true,
				path: '/center',
				name: 'Centers',
				component: CenterPage,
				icon: LocationCity,
			},
			{
				key: 2,
				exact: true,
				path: '/programme',
				name: 'Programmes',
				component: Second,
				icon: CollectionsBookmark,
			},
			{
				key: 3,
				exact: true,
				path: '/course',
				name: 'Courses',
				component: Third,
				icon: LibraryBooks,
			},
			{
				key: 4,
				exact: true,
				path: '/allocation',
				name: 'Course Allocation',
				component: Third,
				icon: FolderOpen,
			},
			{
				key: 5,
				exact: true,
				path: '/users',
				name: 'Users',
				component: Third,
				icon: Group,
			},
		],
		centerMgnt: [
			{
				key: 1,
				exact: true,
				path: '/venue',
				name: 'Venue',
				component: Second,
				icon: Domain,
			},
			{
				key: 2,
				exact: true,
				path: '/center_courses',
				name: 'Programmes',
				component: Second,
				icon: FileCopy,
			},
			{
				key: 3,
				exact: true,
				path: '/students',
				name: 'Students',
				component: Second,
				icon: GroupAdd,
			},
			{
				key: 4,
				exact: true,
				path: '/center_script',
				name: 'Scripts',
				component: Second,
				icon: Description,
			},
		],
	};

	render() {
		const { routes, sub_routes, centerMgnt } = this.state;

		return (
			<Router history={history}>
				<Switch>
					<Dashboard routes={routes} sub_routes={sub_routes} centerMgnt={centerMgnt} />
				</Switch>
			</Router>
		);
	}
}
