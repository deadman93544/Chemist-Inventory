import Head from "next/head"
import { Sales } from "../../components/sale/Sales"

const sales = () => {
  return (
    <>
      <Head>
        <title>Sales</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Sales />
    </>
  )
}

export default sales