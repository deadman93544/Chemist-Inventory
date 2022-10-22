import { Menu } from "antd"
import { useRouter } from "next/router";
import {
    AiOutlineCalendar, 
    AiTwotoneCalendar, 
    AiOutlineMedicineBox, 
    AiOutlineUnorderedList,
    AiOutlineMessage,
    AiOutlineUsergroupAdd,
} from 'react-icons/ai'
import {HiOutlineDocumentDownload} from 'react-icons/hi'
import {RiBillLine} from 'react-icons/ri'

const Sidebar = () => {

  const router = useRouter();

  const getItem = (label, key, icon, onClick, children) => {
    return {
      key, icon, label, onClick, children
    }
  }

  const items = [
    getItem("Daily Sale", 0, <AiTwotoneCalendar style={{color:'white'}}/>, () => {router.push('/daySale')}),
    getItem("Monthly Sale", 1, <AiOutlineCalendar style={{color:'white'}}/>, () => {router.push('/monthSale')}),
    getItem("Sales", 2, <AiOutlineUnorderedList style={{color:'white'}}/>, () => {router.push('/sales')}),
    getItem("Inventory", 3, <AiOutlineMedicineBox style={{color:'white'}}/>, () => {router.push('/inventory')}),
    getItem("Customers", 4, <AiOutlineUsergroupAdd style={{color:'white'}}/>, () => {router.push('/customers')}),
    getItem("Billing", 5, <RiBillLine style={{color:'white'}}/>, () => {router.push('/billing')}),
    getItem("Notifications", 6, <AiOutlineMessage style={{color:'white'}}/>, () => {router.push('/notifications')}),
    getItem("Reports", 7, <HiOutlineDocumentDownload style={{color:'white'}}/>, () => {router.push('/reports')}),
  ]

  return (
    <>
        <div style={{height:'10vh'}}>
          {/* <Image src="/images/logo.svg" layout="fill" width="150px" height="90px" style={{objectFit:'contain'}}/> */}
        </div>
        <Menu theme="dark" items={items} selectable={false} />
    </>
  )
}

export default Sidebar