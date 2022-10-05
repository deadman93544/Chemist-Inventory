import { Avatar, Breadcrumb, Button, Card, Col, Collapse, Divider, Input, message, Modal, Row, Space, Switch, Typography } from "antd"
import { ReloadOutlined, HomeOutlined, PlusOutlined, DeleteOutlined, EditOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import SaleItemForm from "./SaleItemForm";
import { fetchCustomerList } from "../../controller/customer";
import Link from "next/link";
import { createSale } from "../../controller/sale";
import { useRouter } from "next/router";

const CreateSale = () => {

  const [saleitems, setSaleItems] = useState([]); 
  const [addpanelVisible, setAddPanelVisible] = useState(false);
  const [activePanelKey, setActivePanelKey] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [customerName, setCustomerName] = useState('')
  const [customerContact, setCustomerContact] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("PAID");
  const [balance, setBalance] = useState(0);

  const router = useRouter();

  const fetchCustomers = async () => {
    const {data, error} = await fetchCustomerList();
    if (error !== null) {
        errorMessage("Unable to load Inventory");
    }
    else {
        console.log(data);
        setCustomerList(data);
    }
  }

  const errorMessage = (msg) => {
    message.error(msg);
  }

  const handleReload = () => {
    setSaleItems([]);
    setSalePrice(0);
    setDiscount(0);
    setActivePanelKey(null);
    setAddPanelVisible(false);
    setDiscountedPrice(0);
  }

  const addItem = () => {
    setAddPanelVisible(true);
  }

  const handleAdd =  (saleItem) => {
    console.log(saleItem);
    setSalePrice(salePrice + saleItem.saleItemPrice);
    setSaleItems([...saleitems, saleItem]);
    setAddPanelVisible(false)
  }

  const cancelAdd = () => {
    setAddPanelVisible(false)
  }

  const handleEdit = (saleItem, idx) => {
    let mod = saleitems.map((item, id) => {
        if(id === idx){
            setSalePrice(salePrice - item.saleItemPrice + saleItem.saleItemPrice);
            return saleItem;
        }
        else return item;
    })
    console.log(mod);
    setSaleItems(mod);
    setActivePanelKey(null)
  }

  const deleteSaleItem = (idx) => {
    let mod = saleitems.filter(saleItem => {
        if(saleItem.itemRequest.id !== idx){
            return true;
        }
        else {
            setSalePrice(salePrice - saleItem.saleItemPrice);
            return false;
        }
    })
    setSaleItems(mod);
  }

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
    // console.log(e.target.value);
    // console.log(salePrice - (salePrice*e.target.value/100));
    setDiscountedPrice(salePrice - (salePrice*e.target.value/100));
  }

  const handleContactChange = (e) => {
    let pattern = /^\d{10}$/;
    if(e.target.value.match(pattern)){
        let customerRes = customerList.filter(customer => customer.phoneNum === e.target.value);
        if(customerRes.length > 0){
            console.log(customerRes);
            setCustomer(customerRes[0]);
            setCustomerContact(customerRes[0].phoneNum);
            setCustomerName(customerRes[0].name);
        }
        else{
            setCustomerContact(e.target.value);
            setCustomer(null);
            setCustomerName('')
        }
    }else{
        if(e.target.value.length <= 10){
            setCustomerContact(e.target.value)
            setCustomer(null);
            setCustomerName('')
        }
    }
  }

  const handleCheckout = () => {
    if(paymentStatus === "BALANCE" && balance === 0){
        setPaymentStatus("PAID");
        setBalance(0);
    }
    let obj = {
        saleItemRequests: saleitems,
        paymentStatus: paymentStatus,
        customerRequest: customer === null ? {
            name: customerName,
            phoneNum: customerContact.match(/^\d{10}$/) ? customerContact : null

        } : customer,
        discountPercent: discount,
        actualPrice: salePrice,
        discountedPrice: discountedPrice,
        balance: balance,
        doctorName: doctor
    }
    // console.log(obj);
  }

  const addSale = async(sale) => {
    const {data, error} = await createSale(sale);
    if (error !== null) {
        errorMessage("Unable to create Sale");
    }
    else {
        console.log(data);
        // setCustomerList(data);
    }
    router.push('/dashboard')
  }

  useEffect(() => {fetchCustomers()}, [])

  useEffect(() => {
    setDiscountedPrice(salePrice - (salePrice*discount/100));
  }, [salePrice, discount])

  return (
    <>
        <Row justify="start" style={{margin:'10px 0'}} align='middle'>
            <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
            <Col xl={6} lg={7} md={8} sm={11} xs={12} style={{padding:'0 10px'}}>
                <Space size='large' split={<Divider />}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link  href="/">
                                <a style={{color: '#2B7A0B'}}>
                                    <Space><HomeOutlined style={{fontSize:'18px'}}/>Home</Space>
                                </a>
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link href="/sales" >
                                <a style={{color: '#2B7A0B'}}>
                                    <Space>Sales</Space>
                                </a>
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Space>
            </Col>
            <Col xl={6} lg={6} md={6} sm={2} xs={12} style={{display:'flex', justifyContent:'right', paddingRight:'2vw'}}> </Col>
            <Col xl={6} lg={7} md={8} sm={11} xs={24} style={{padding:'0 5px', display:'flex', justifyContent:'right'}}>
                <Space>
                    <Avatar 
                        icon={<ReloadOutlined style={{color: '#2B7A0B'}}/>} 
                        style={{background:'transparent', cursor:'pointer'}}
                        onClick={() => handleReload()}
                    />
                </Space>
            </Col>
            <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
        </Row>
        <Row justify="center" style={{marginTop:'7vh'}} align='middle'>
            {addpanelVisible ? 
            <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%'}}>
                <Collapse accordion defaultActiveKey={['add']}>
                    <Collapse.Panel key='add' header="Add SaleItem"><SaleItemForm initial={{}} onOk={handleAdd} onCancel={cancelAdd}/></Collapse.Panel>
                </Collapse>
            </Col> :
            <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{display:'flex', justifyContent:'center'}}>
                <Button type="primary" shape="round" icon={<PlusOutlined />} size="large" onClick={() => addItem()}>
                    Add {saleitems.length ? "More" : "Items"}
                </Button>
            </Col>
            }
            <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%'}}>
                <Collapse activeKey={[activePanelKey]} collapsible='disabled' style={{marginTop:'10vh'}} bordered={false}>
                    {saleitems.map((saleItem,idx) => {
                        return (
                            <Collapse.Panel key={saleItem.idx} showArrow={false} header={
                                <Row gutter={16} justify='center' style={{padding: '10px'}}>
                                    <Col span={6}>
                                        <Space align="baseline">
                                            <Typography.Title level={5} style={{color:'#2B7A0B'}}>Name: </Typography.Title>
                                            <Typography.Paragraph>{saleItem.itemRequest.name}</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={6}>
                                        <Space align="baseline">
                                            <Typography.Title level={5} style={{color:'#2B7A0B'}}>Price: </Typography.Title>
                                            <Typography.Paragraph>{saleItem.itemRequest.itemPrice}</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={6}>
                                        <Space align="baseline">
                                            <Typography.Title level={5} style={{color:'#2B7A0B'}}>Quantity: </Typography.Title>
                                            <Typography.Paragraph>{saleItem.quantity}{saleItem.subQuantity > 0 && `.${saleItem.subQuantity}`}</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={6}>
                                        <Space align="baseline">
                                            <Typography.Title level={5} style={{color:'#2B7A0B'}}>Total: </Typography.Title>
                                            <Typography.Paragraph>{saleItem.saleItemPrice}</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            }
                            extra={
                                activePanelKey === idx ? <></> :
                                <Space align="middle" size="large" >
                                    <Avatar style={{cursor:'pointer', background:'transparent'}} icon={<DeleteOutlined style={{fontSize:'16px', color: '#2B7A0B'}}/>} onClick={() => deleteSaleItem(saleItem.itemRequest.id)}/>
                                    <Avatar style={{cursor:'pointer', background:'transparent'}} icon={<EditOutlined style={{fontSize:'16px', color: '#2B7A0B'}}/>} onClick={() => setActivePanelKey(idx)}/>
                                </Space>
                            }
                            >
                                <SaleItemForm initial={saleItem} onOk={(saleItem) => handleEdit(saleItem, idx)} onCancel={() => {setActivePanelKey(null)}}/>
                            </Collapse.Panel>
                        )
                    })}
                </Collapse>
            </Col>
            { saleitems.length === 0 ? <></> :
                <>
                    <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%', marginTop:'10px'}}>
                        <Card bodyStyle={{padding:'15px'}}>
                            <Row >
                                <Col span={20} style={{display:'flex', justifyContent:'right', paddingRight:'20px'}}>
                                    <Typography.Title level={5} style={{color:'#2B7A0B'}}>Total Price</Typography.Title>
                                </Col>
                                <Col span={4} style={{display:'flex', justifyContent:'right', paddingRight:'50px', fontWeight:'bolder'}}>
                                    <Typography.Paragraph delete={discount !== 0} type={discount === 0 ? 'success': 'danger'}>{salePrice} /-</Typography.Paragraph>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%', marginTop:'10px'}}>
                        <Card bodyStyle={{padding:'15px'}}>
                            <Row >
                                <Col span={12} style={{paddingLeft:'50px'}}>
                                    <Space align='center'>
                                        <Typography.Paragraph style={{fontSize:'16px', marginTop:'10px', marginRight:'10px'}}>Discount percent: </Typography.Paragraph>
                                        <Input 
                                            type="number" 
                                            placeholder="Enter Discount percent" 
                                            value={discount} 
                                            onChange={(e) =>handleDiscountChange(e)} 
                                            addonAfter='%'
                                            min={0}
                                            max={100}
                                        />
                                    </Space>
                                </Col>
                                <Col span={8} style={{display:'flex', justifyContent:'right', paddingRight:'20px'}}>
                                    <Typography.Title level={5} style={{color:'#2B7A0B'}}>Discounted Price</Typography.Title>
                                </Col>
                                <Col span={4} style={{display:'flex', justifyContent:'right', paddingRight:'50px', fontWeight:'bolder'}}>
                                    <Typography.Paragraph type="success">{discountedPrice} /-</Typography.Paragraph>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%', marginTop:'10px'}}>
                        <Card bodyStyle={{padding:'15px'}}>
                            <Row >
                                <Col span={8} style={{paddingLeft:'50px'}}>
                                    <Input 
                                        type="text" 
                                        placeholder="Contact No." 
                                        value={customerContact} 
                                        onChange={handleContactChange}
                                        // rules={[
                                        //     {
                                        //       pattern: /^\d{10}$/,
                                        //       message:'Insert Valid number'
                                        //     },
                                        // ]}
                                    />
                                </Col>
                                <Col span={8} style={{padding:'0 10px'}}>
                                    <Input 
                                        type="text" 
                                        placeholder="Customer Name" 
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value.toUpperCase())}
                                    />
                                </Col>
                                <Col span={8} style={{paddingRight:'50px'}}>
                                    <Input 
                                        type="text" 
                                        placeholder="Prescribed By" 
                                        value={doctor}
                                        onChange={(e) => setDoctor(e.target.value.toUpperCase())}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%', marginTop:'10px'}}>
                        <Card bodyStyle={{padding:'15px'}}>
                            <Row >
                                <Col span={8} style={{paddingLeft:'50px'}}>
                                    <Switch
                                        checkedChildren={"PAID"}
                                        unCheckedChildren={"BALANCE"}
                                        defaultChecked
                                        onChange={checked => setPaymentStatus(checked? "PAID" : "BALANCE")}
                                    />
                                </Col>
                                <Col span={8} style={{padding:'0 10px'}}>
                                    {paymentStatus === "BALANCE" ?
                                        <Input 
                                            type="number"
                                            min={0}
                                            max={discountedPrice} 
                                            placeholder="Balance amount" 
                                            value={balance}
                                            onChange={(e) => setBalance(e.target.value)}
                                        /> : <></>
                                    }
                                </Col>
                                <Col span={8} style={{paddingRight:'50px', display:'flex', justifyContent:'right'}}>
                                    <Button type="primary" size="large" onClick={handleCheckout}>Checkout</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={18} lg={20} md={22} sm={24} xs={24} style={{width:'100%', marginTop:'50px'}}></Col>
                </>
            }
        </Row>
    </>
  )
}

export default CreateSale