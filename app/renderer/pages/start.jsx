import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import 'antd/dist/antd.css'
import { Login } from './login';


export default () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden"}}>
      <Login />
    </div>
  );
}
  