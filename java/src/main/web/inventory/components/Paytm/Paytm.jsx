import {useEffect, useState} from 'react'
import { Button, Card, Col, Divider, Input, InputNumber, Layout, Row ,Select,Table,Typography} from 'antd'
import { generateCheckSum } from '../../controller/transaction';
const { Meta } = Card;
const {Title}=Typography

export const Paytm = () => {

  const fetchCheckSum = async () => {
    const res = generateCheckSum("");
    console.log(res);
  }

  return (
    <>
      <Layout>
        <Layout.Header>

        </Layout.Header>
        <Layout.Content>
          <Row gutter={32}  justify='center'>
              <Col span={7}>
                  <Card style={{textAlign:'center',borderRadius:'20px', backgroundColor:'#F1D1D0'}}  >
                  <Title level={2}>LIBERTY</Title>
                  <Meta   title={<><Title level={4} style={{padding:'5px 0',backgroundColor:'#3BACB6',borderTopRightRadius:'50px',borderBottomRightRadius:'50px', color:'white', display:'inline'}}>INR 10</Title><Title level={5} style={{color:'white', display:'inline'}}>per month</Title></>}  style={{marginBottom:'20px',marginLeft:'-25px',paddingLeft:'0'}}/>
                  <p>lorem ipsum dolor sit amet</p>
                  <Divider />
                  <p>lorem ipsum dolor sit amet</p>
                  <Divider />
                  <p>lorem ipsum dolor sit amet</p> 
                  <Divider />
                  <p>lorem ipsum dolor sit amet</p>
                      <Title 
                        level={5} 
                        style={{
                          backgroundColor:'#3BACB6',
                          borderTopLeftRadius:'30px',
                          borderBottomLeftRadius:'30px', 
                          color:'white',
                          marginRight:'-25px', 
                          padding:'10px 0',
                          cursor:'pointer'
                        }}
                        onClick={() => fetchCheckSum()}
                      >
                          Try Now
                      </Title>
                  </Card>
              </Col>
          </Row>
        </Layout.Content>
      </Layout>
        
    </>
  )
}

// function loadScript(src) {
// 	return new Promise((resolve) => {
// 		const script = document.createElement('script')
// 		script.src = src
// 		script.onload = () => {
// 			resolve(true)
// 		}
// 		script.onerror = () => {
// 			resolve(false)
// 		}
// 		document.body.appendChild(script)
// 	})
// }