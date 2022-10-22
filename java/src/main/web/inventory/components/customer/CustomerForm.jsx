import {Input, Form, Row, Col, Checkbox, Button, message} from 'antd'
import { useEffect } from 'react';
// import { addInventoryItem, editInventoryItem } from "../../controller/item"
import { addCustomer, editCustomer } from '../../controller/customer';

const CustomerForm = ({initial, mode, handlemessage}) => {

  console.log("Initial is: ", initial);

  const [form] = Form.useForm();
  console.log("Initail: ", initial);

  const handleSubmit = async (val) => {
    console.log(val);
    let customer = {
      name: val.name.toUpperCase(),
      balance: val.balance,
      phoneNum: val.phoneNum,
    }
    let {msg, res} = mode === "Add" ? await handleAdd(customer) : await handleEdit(customer);
    handlemessage(msg, res);
  }

  const handleAdd = async (customer) => {
    let res = await addCustomer(customer);
    if (res.data === 200){
      return {msg:"Customer: " + customer.name + " added successfully.", res:res.data};
    }
    else {
      return {msg: "Error adding the customer: " + customer.name + ".", res:res.data};
    }
  }

  const handleEdit = async (customer) => {
    let res = await editCustomer({...customer, id: initial.key});
    console.log(res);
    if (res.data === 200){
      return {msg:"Customer: " + customer.name + " updated successfully.", res:res.data};
    }
    else {
      return {msg: "Error updating the customer: " + customer.name + ".", res: res.data};
    }
  }

  useEffect(()=>{
    form.resetFields();
  })

  return (
    <>
      <Form
        style={{display:'flex'}}
        form={form}
        initialValues={
          initial 
          // ? {name: initial.name, price: initial.price, available: initial.available === "Yes" ? true : false} 
          ? initial
          : {name:"", balance:0, phoneNum:""}
        }
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row justify='center' style={{display: 'flex', flexDirection:'row'}} gutter={[24, 24]} align='middle'>
          <Col span={12}>
            <Form.Item
              label="Customer Name"
              name="name"
              required
            >
              <Input/>
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Phone number"
              name="phoneNum"
              required
              rules={[
                {
                  pattern: /^\d{10}$/,
                  message:'Insert Valid number'
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Balance"
              name="balance"
              // required
            >
              <Input disabled={true}/>
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {mode === "Add" ? "Add" : mode === "Edit" ? "Update" : ""}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  )
}

export default CustomerForm