import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import { NotFound } from './Errors'
import { createMemoryHistory } from 'history';
import { First, Second, Third } from './routePages';
import Dashboard from './dashboard';

const history = createMemoryHistory();

export default class extends Component {
	state = {
		routes: [
			{
				key: 1,
				exact: true,
				path: '/first',
				name: 'First',
				component: First,
				icon: 'All mail',
			},
			{
				key: 2,
				exact: true,
				path: '/second',
				name: 'Second',
				component: Second,
				icon: 'Trash',
			},
			{
				key: 3,
				exact: true,
				path: '/third',
				name: 'Third',
				component: Third,
				icon: 'Spam',
			},
		],
	};

	//<Route component={NotFound} />
	// <Dashboard routes={routes}>
	// 				<Switch>
	// 					<Route exact path="/first" render={() => <First />} />
	// 					<Route path="/second" render={() => <Second />} />
	// 					<Route path="/third" render={() => <Third />} />
	// 				</Switch>
	// 			</Dashboard>

	render() {
		const { routes } = this.state;

		return (
			<BrowserRouter history={history}>
				<div>
					<ul>
						<li>
							<Link to="/first">First</Link>
						</li>
						<li>
							<Link to="/second">Second</Link>
						</li>
						<li>
							<Link to="/third">Third</Link>
						</li>
					</ul>

					<Route path="/first" render={() => <First />} />
					<Route path="/second" render={() => <Second />} />
					<Route path="/third" render={() => <Third />} />
				</div>
			</BrowserRouter>
		);
	}
}
