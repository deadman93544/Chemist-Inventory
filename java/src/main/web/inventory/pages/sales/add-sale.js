import Head from "next/head"
import CreateSale from "../../components/CreateSale/CreateSale"
import { Layout } from "antd"

const {Content} = Layout

const addSale = () => {
    return (
        <>
          <Head>
            <title>Add Sale</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Layout style={{background:'whitesmoke', minHeight:'100vh'}}>
            <Content >
              <CreateSale />
            </Content>
          </Layout>
        </>
    )
}

export default addSale