import { Layout,} from "antd"
import { useEffect, useState } from "react"
import DashboardContent from "./DashboardContent"
import Sidebar from "./Sidebar"

const {Header, Footer, Sider, Content} = Layout

const Dashboard = () => {

  const [contentStyle, setContentStyle] = useState({
    marginLeft: '200px',
  });
  
  return (
    <>
    <Layout hasSider>
      <Sider
        collapsible
        breakpoint="md"
        collapsedWidth="80px"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
          if(collapsed === true){
            setContentStyle({marginLeft: '80px'})
          }
          else {
            setContentStyle({marginLeft: '200px'});
          }
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar />
      </Sider>
      <Layout style={{background:'whitesmoke'}}>
        <Header
          style={{
            padding: 0,
            background: '#111'
          }}
        />
        <Content
          style={{
            margin: '24px 16px 24px',
            overflow: 'initial',
            background:'whitesmoke'
          }}
        >
          <DashboardContent styleObj={contentStyle}/>
        </Content>
      </Layout>
  </Layout>

    </>
  )
}

export default Dashboard