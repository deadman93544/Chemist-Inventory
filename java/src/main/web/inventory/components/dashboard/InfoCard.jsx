import { Avatar, Card, Col, Divider, Row, Space, Typography } from "antd"
import {AiOutlineCalendar} from 'react-icons/ai'

const InfoCard = ({info}) => {
  return (
    <>
        <Card bodyStyle={{height:'200px'}}>
            {/* <Card.Meta 
                style={{justifyContent:'center'}}
                title={<h3>{info.title}</h3>}
                // avatar={<Avatar style={{background:'transparent'}}>{info.icon} </Avatar>}
                avatar={info.icon}
            /> */}
            <Row justify="center" align="middle">
                <Col span={24} style={{display:'flex', justifyContent:'center'}}>
                    <Space align="start" size="middle">
                        <p style={{fontSize:'20px', marginTop:'-3px'}}>{info.title}</p>
                        <Avatar style={{background:'transparent'}}>{info.icon}</Avatar>
                    </Space>
                </Col>
            </Row>
            <Divider style={{margin:'15px'}}/>
            <Row justify="center">
                <Col span={24} style={{justifyContent:'center', display:'flex'}}>
                    <h1 style={{fontSize:'40px', fontWeight:'lighter'}}>
                        {info.data}
                        {info.sub ? <sub style={{fontSize:'15px', marginLeft:'2px', marginTop:'-8px'}}>{info.sub}</sub> : <></>}
                    </h1>
                </Col>
            </Row>
        </Card>
    </>
  )
}

export default InfoCard