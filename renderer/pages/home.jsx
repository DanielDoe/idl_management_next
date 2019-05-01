import React from 'react';
import Head from 'next/head';

import Login from '../components/Login';

export default () => (
  <React.Fragment>
    <Head>
      <title>Institute of Distance Learning</title>
    </Head>

    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Login />
    </div>
  </React.Fragment>
);
