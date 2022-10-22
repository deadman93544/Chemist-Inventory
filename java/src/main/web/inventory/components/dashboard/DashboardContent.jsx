import { Card, Col, Row } from "antd"
import { useEffect } from "react"
import InfoCard from "./InfoCard"
import {AiTwotoneCalendar, AiOutlineCalendar, AiOutlineMedicineBox, AiOutlineUsergroupAdd} from 'react-icons/ai'

const DashboardContent = ({styleObj, daySale, monthSale, customers, inventory}) => {

  const info = [
    {
        'title': 'Monthly Sale',
        icon: <AiOutlineCalendar style={{color:'blue', fontSize:'25px'}}/>,
        data: monthSale && monthSale.monthlySaleAmount,
        prefix: '₹',
        link: '/monthSale',
        precision: 2
    },
    {
        'title': 'Daily Sale',
        icon: <AiTwotoneCalendar style={{color:'blue', fontSize:'25px'}}/>,
        data: daySale && daySale.daySaleAmount,
        prefix: '₹',
        link: '/daySale',
        precision: 2
    },
    {
        'title': 'Inventory',
        icon: <AiOutlineMedicineBox style={{color:'blue', fontSize:'25px'}}/>,
        data: inventory && inventory,
        sub: 'items',
        link:'/inventory',
        precision: 0
    },
    {
        'title': 'Customers',
        icon: <AiOutlineUsergroupAdd style={{color:'blue', fontSize:'25px'}}/>,
        data: customers && customers,
        sub: 'people',
        link:'/customers',
        precision: 0
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