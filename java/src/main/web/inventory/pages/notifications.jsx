import Head from 'next/head';
import PageNotAvailable from '../components/Util/PageNotAvailable';

const notifications = () => {

  return (
    <>
      <Head>
        <title>Notifications</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PageNotAvailable />
    </>
  )
}

export default notifications