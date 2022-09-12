import { Avatar, Breadcrumb, Button, Col, Divider, Row, Space } from "antd"
import { AiOutlineHome } from "react-icons/ai";
import TableSearchBar from "../TableSearchBar/TableSearchBar";
import { ReloadOutlined, HomeOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CreateSale = () => {

  const handleChange = (val) => {
    console.log(val);
  }

  return (
    <>
        <Row justify="start" style={{margin:'10px 0'}} align='middle'>
            <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
            <Col xl={6} lg={7} md={8} sm={11} xs={12} style={{padding:'0 10px'}}>
                <Space size='large' split={<Divider />}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/" style={{color: '#2B7A0B'}}>
                                <Space><HomeOutlined style={{fontSize:'18px'}}/>Home</Space>
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/sales" style={{color: '#2B7A0B'}}>
                                <Space>Sales</Space>
                            </a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Avatar 
                        icon={<ReloadOutlined style={{color: '#2B7A0B'}}/>} 
                        style={{background:'transparent', cursor:'pointer'}}
                        onClick={() => handleReload()}
                    />
                </Space>
            </Col>
            <Col xl={6} lg={6} md={6} sm={2} xs={12} style={{display:'flex', justifyContent:'right', paddingRight:'2vw'}}>
                <Button
                    shape="round" 
                    style={{border:'1px solid #2B7A0B', color:'#2B7A0B'}}
                    icon={<PlusOutlined style={{fontWeight:'bolder'}}/>}
                    size="large"
                    onClick={() => showAddEditModal("Add", null)}
                >
                    Add
                </Button>
            </Col>
            <Col xl={6} lg={7} md={8} sm={11} xs={24} style={{padding:'0 5px'}}>
                
                {/* <TableSearchBar handleChange={handleChange} items={items}  placeholder="Search Item name..."/> */}
            </Col>
            <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
        </Row>
    </>
  )
}

export default CreateSale