import Dashboard from "../components/dashboard/Dashboard"
import Head from 'next/head'

const index = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Dashboard />
    </>
  )
}

export default index