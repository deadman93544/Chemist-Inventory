import Customers from "../components/customer/Customers"
import { fetchCustomerList } from "../controller/customer"
import Head from "next/head";

export const getServerSideProps = async (context) => {

  const customers = await fetchCustomerList();

  return {
    props: {
      customers
    }
  }
}

const customers = ({customers}) => {
  return (
    <>
      <Head>
        <title>Customers</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Customers customers={customers}/>
    </>
  )
}

export default customers