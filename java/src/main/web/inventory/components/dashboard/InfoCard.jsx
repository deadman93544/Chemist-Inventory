import { Avatar, Card, Col, Divider, Row, Space, Statistic, Typography } from "antd"
import { useRouter } from "next/router"
import {AiOutlineCalendar} from 'react-icons/ai'

const InfoCard = ({info}) => {

    const router = useRouter();

  return (
    <>
        <Card bodyStyle={{display:'flex', justifyContent:'center', cursor:'pointer'}} onClick={() => {info.link && router.push(info.link)}}>
            <Statistic
                valueStyle={{fontSize: '30px', color:'green'}}
                title={info.title} 
                value={info.data} 
                prefix={info.prefix && info.prefix} 
                suffix={info.sub && info.sub} 
                precision={info.precision} 
            />
        </Card>
    </>
  )
}

export default InfoCard