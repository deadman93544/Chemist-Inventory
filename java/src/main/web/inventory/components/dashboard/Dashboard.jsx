import { Button, Col, Layout, Row,} from "antd"
import { useEffect, useState } from "react"
import DashboardContent from "./DashboardContent"
import Sidebar from "./Sidebar"
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

const {Header, Footer, Sider, Content} = Layout

const Dashboard = () => {

  const router = useRouter();

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
        >
          <Row justify="center" align="middle">
              <Col span={20}></Col>
              <Col span={4} style={{display:'flex', justifyContent:'center', padding:'10px'}}>
                  <Button 
                      shape="round" 
                      icon={<PlusOutlined style={{fontWeight:'bolder'}}/>}
                      size="large"
                      onClick={() => router.push('/sales/add-sale')}
                  >
                      Add
                  </Button>
              </Col>
          </Row>
        </Header>
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