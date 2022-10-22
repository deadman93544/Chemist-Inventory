import Head from "next/head"
import { Sales } from "../../components/sale/Sales"
import { getSaleList } from "../../controller/sale";

export const getServerSideProps = async (context) => {

    const sales = await getSaleList();
  
    return {
      props: {
        sales: sales
      }
    }
  }

const sales = ({sales}) => {
  return (
    <>
      <Head>
        <title>Sales</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Sales sales={sales}/>
    </>
  )
}

export default sales