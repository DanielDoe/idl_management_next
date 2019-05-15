import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { First, Second, Third } from './routePages';
import CenterPage from '../centers';
import Programme from '../programmes';
import Course from '../courses';
import Venue from '../venue';
import User from '../users';
import CenterMgnt from '../centerManagement';
import Teaching from '../teachingTimetable';
import ExamTable from '../examTimetable';
import Allocation from '../allocations';
import CenterCourse from '../centerCourses/';
import ExamPapers from '../scripts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
import Settings from '@material-ui/icons/Settings';
import Logo from '../_shared/img/logof.png';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
		width: '100%',
		height: '100vh',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	sidemenu: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		height: '90%',
	},
});

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			dropdown: false,
			auth_status: null,
		};
	}

	renderRoutes = () => {
		if (typeof window === 'undefined') {
			return <div />;
		}
		const credentials = JSON.parse(localStorage.getItem('login'));
		console.log('credentials: ', credentials);
		if (!credentials || credentials.auth_status !== 'admin') {
			return <div />;
		}
		return (
			<div>
				<List>
					{this.props.sub_routes.map((elem, index) => (
						<ListItem
							button
							key={elem.key}
							component={Link}
							to={elem.path}
							selected={elem.path === this.props.location.pathname}
						>
							<ListItemIcon>
								<elem.icon />
							</ListItemIcon>
							<ListItemText primary={elem.name} />
						</ListItem>
					))}
				</List>
			</div>
		);
	};

	componentDidMount() {
		this.renderRoutes();
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleClick = () => {
		this.setState(state => ({ dropdown: !state.dropdown }));
	};

	renderContent() {
		switch (this.props.location.pathname) {
			case '/':
				return <CenterMgnt />;
			case '/exam':
				return <ExamTable />;
			case '/center_m':
				return <CenterMgnt />;
			case '/teaching':
				return <Teaching />;
			case '/center':
				return <CenterPage />;
			case '/venue':
				return <Venue />;
			case '/programme':
				return <Programme />;
			case '/course':
				return <Course />;
			case '/allocation':
				return <Allocation />;
			case '/center_courses':
				return <CenterMgnt />;
			case '/center_script':
				return <ExamPapers />;
			case '/users':
				return <User />;
		}
	}

	render() {
		const { classes, theme, routes, sub_routes, centerMgnt, dropdown } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: this.state.open,
					})}
				>
					<Toolbar disableGutters={!this.state.open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: this.state.open,
							})}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open,
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open,
						}),
					}}
					open={this.state.open}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
						{routes.map((elem, index) => (
							<ListItem
								button
								key={elem.key}
								component={Link}
								to={elem.path}
								selected={elem.path === this.props.location.pathname}
							>
								<ListItemIcon>
									<elem.icon />
								</ListItemIcon>
								<ListItemText primary={elem.name} />
							</ListItem>
						))}
						<ListItem button onClick={this.handleClick}>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText inset primary="Center Config" />
							{this.state.dropdown ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.dropdown} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{centerMgnt.map((elem, index) => (
									<ListItem
										button
										key={elem.key}
										component={Link}
										to={elem.path}
										selected={elem.path === this.props.location.pathname}
									>
										<ListItemIcon>
											<elem.icon />
										</ListItemIcon>
										<ListItemText primary={elem.name} />
									</ListItem>
								))}
							</List>
						</Collapse>
					</List>
					<Divider />
					{this.renderRoutes()}
					{/* <img src={Logo} className="idl-logo"/> */}
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Paper className={classes.sidemenu} elevation={1}>
						{this.renderContent()}
					</Paper>
				</main>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);
