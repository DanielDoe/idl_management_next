// import React from 'react';
// import { Layout, Menu, Icon } from "antd";
// import { Link } from 'react-router-dom';
// import { First, Second, Third } from './routePages';
// import "./dashboard.css";

// const { Header, Sider, Content } = Layout;

// export default class Dashboard extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   	renderContent(){
// 		switch (this.props.location.pathname) {
// 			case '/first':
// 				return <First/>
// 			case '/second':
// 				return <Second />
// 		}
// 	}

//   render() {
//     return (
//       <div id="#components-layout-demo-custom-trigger">
//         <Layout style={{ width: "100%", height: "100vh" }}>
//           <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
//             <div className="logo" />
//             <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//               <Menu.Item key="1">
//                 <Icon type="user" />
//                 <Link to="/first">First</Link>
//               </Menu.Item>
//               <Menu.Item key="2">
//                 <Icon type="video-camera" />
//                 <Link to="/second"><span>Second</span></Link>
//               </Menu.Item>
//               <Menu.Item key="3">
//                 <Icon type="upload" />
//                 <span>nav 3</span>
//               </Menu.Item>
//             </Menu>
//           </Sider>
//           <Layout>
//             <Header style={{ background: "#fff", padding: 0 }}>
//               <Icon
//                 className="trigger"
//                 type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
//                 onClick={this.toggle}
//               />
//             </Header>
//             <Content
//               style={{
//                 margin: "24px 16px",
//                 padding: 24,
//                 background: "#fff",
//                 minHeight: 280,
//               }}
//             >
//               {this.renderContent()}
//             </Content>
//           </Layout>
//         </Layout>
//       </div>
//     );
//   }
// }

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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import { First, Second, Third } from './routePages';
import CenterPage from '../centers/center';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
		width: "100%",
		height: "100vh"
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
	height: "90%",
	}
});

class Dashboard extends React.Component {
	state = {
		open: false,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	renderContent() {
		switch (this.props.location.pathname) {
			case '/first':
				return <First />;
			case '/second':
				return <Second />;
			case '/third':
				return <Third />;
				case '/center':
				return <CenterPage />;	
		}
	}

	render() {
		const { classes, theme, routes, sub_routes } = this.props;

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
							<ListItem button key={elem.key} component={Link} to={elem.path} selected={elem.path===this.props.location.pathname}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={elem.name} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{sub_routes.map((elem, index) => (
							<ListItem button key={elem.key} component={Link} to={elem.path} selected={elem.path===this.props.location.pathname}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={elem.name} />
							</ListItem>
						))}
					</List>
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
