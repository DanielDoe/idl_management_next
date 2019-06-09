import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'antd';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import '../components/login/login.css';
import 'antd/dist/antd.css';
import { Login } from '../components/login/login';
import LoginCarousel from "../components/login/login-carousel";

moment.locale('en');
export default () => {
	return (
		<LocaleProvider>
			<React.Fragment>
				<Head>
					<title>Institute of Distance Learning</title>
				</Head>

				<div className="login-container" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
					<Row>
						<Col span={12}>
							<LoginCarousel />
						</Col>
						<Col span={12}>
							<div className="login-container-style">
								<Login />
							</div>
						</Col>
					</Row>
				</div>
			</React.Fragment>
		</LocaleProvider>
	);
};
