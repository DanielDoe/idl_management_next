import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import './hello.css'

export default () => (
  <React.Fragment>
    <Head>
      <title>Hello</title>
    </Head>
    <h1>Hello!</h1>
    <p>You're welcome.</p>
    <Link href='/start'><a>Back</a></Link>
  </React.Fragment>
)
