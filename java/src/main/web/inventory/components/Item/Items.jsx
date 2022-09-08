import { Breadcrumb, Button, Col, Layout, Row, Space } from "antd"
import TableSearchBar from "../TableSearchBar/TableSearchBar"
import ItemList from "./ItemList"
import {AiOutlineHome, AiOutlinePlus} from 'react-icons/ai'
import { useEffect, useState } from "react"
import { fetchInventoryList } from "../../controller/item"
import { PlusOutlined } from '@ant-design/icons';


const {Content, Header} = Layout

const Items = ({items}) => {

    const [data, setData] = useState(items.data);
    const [reload, setReload] = useState(false);
    const [add, setAdd] = useState(false);

    useEffect(() => {

    }, [add])

    useEffect(() => {
        // const res = await fetchInventoryList();
        // setData(res.data);
        fetchItems()
        setReload(false);
    }, [reload]);

    const fetchItems = async () => {
        let res = await fetchInventoryList();
        setData(res.data);
    }

    const handleChange = (val) => {
        console.log(val);
        if(val.length <= 2) {
            setData(items.data)
        }
        else if(val.length > 2){
            let dat = items.data.filter(item => {
                return item.name.includes(val)
            })
            // console.log(dat);
            setData(dat)
        }
    }

  return (
    <>
        <Layout>
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
                            onClick={() => setAdd(true)}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{padding:'20px 0'}}>
                <Row justify="start" style={{margin:'10px 0'}} align='middle'>
                    <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
                    <Col xl={6} lg={7} md={8} sm={11} xs={12} style={{padding:'0 10px'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/" style={{color:"blue"}}>
                                    <Space><AiOutlineHome />Home</Space>
                                </a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={2} xs={0}></Col>
                    <Col xl={6} lg={7} md={8} sm={11} xs={12}>
                        <TableSearchBar handleChange={handleChange}/>
                    </Col>
                    <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
                </Row>
                <Row justify="center">
                    <Col xl={18} lg={20} md={22} sm={24} xs={24}>
                        <ItemList 
                            items={data} 
                            handleReload={() => setReload(true)} 
                            addItem={add} 
                            disableAdd={() => setAdd(false)}
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    </>
  )
}

export default Items