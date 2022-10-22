import Items from "../components/Item/Items"
import { fetchInventoryList } from "../controller/item"
import Head from "next/head"

export const getServerSideProps = async (context) => {

  const items = await fetchInventoryList()

  return {
    props: {
      items
    }
  }
}

const inventory = ({items}) => {
  return (
    <>
      <Head>
        <title>Inventory</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Items items={items}/>
    </>
  )
}

export default inventory