import { Card, Col, Row } from "antd"
import { useEffect } from "react"
import InfoCard from "./InfoCard"
import {AiTwotoneCalendar, AiOutlineCalendar, AiOutlineMedicineBox, AiOutlineUsergroupAdd} from 'react-icons/ai'

const DashboardContent = ({styleObj, daySale, monthSale}) => {

  const info = [
    {
        'title': 'Monthly Sale',
        icon: <AiOutlineCalendar style={{color:'blue', fontSize:'25px'}}/>,
        data: monthSale && monthSale.monthlySaleAmount,
        sub: null,
        link:'/inventory'
    },
    {
        'title': 'Daily Sale',
        icon: <AiTwotoneCalendar style={{color:'blue', fontSize:'25px'}}/>,
        data: daySale && daySale.daySaleAmount,
        sub: null,
        link:'/inventory'
    },
    {
        'title': 'Inventory',
        icon: <AiOutlineMedicineBox style={{color:'blue', fontSize:'25px'}}/>,
        data: 10239,
        sub: 'items',
        link:'/inventory'
    },
    {
        'title': 'Customers',
        icon: <AiOutlineUsergroupAdd style={{color:'blue', fontSize:'25px'}}/>,
        data: 10239,
        sub: 'people',
        link:'/inventory'
    }
  ]

  useEffect(() => {

  }, [styleObj])

  return (
    <>
        <div style={{...styleObj, padding:'1vw'}}>
            <Row gutter={[32, 32]} align="middle" justify="center">
                {info.map(item => {
                    return (
                        <Col xl={6} lg={8} md={12} sm={12} xs={20} key={item.title}>
                            <InfoCard info={item}/>                       
                        </Col>
                    )
                })}
            </Row>
        </div>
    </>
  )
}

export default DashboardContent