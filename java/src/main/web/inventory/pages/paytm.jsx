import Head from "next/head"
import { Paytm } from "../components/Paytm/Paytm"

const sales = () => {
  return (
    <>
      <Head>
        <title>Paytm</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Paytm />
    </>
  )
}

export default sales