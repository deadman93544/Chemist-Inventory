import {Input, Form, Row, Col, Checkbox, Button, Select, message} from 'antd'
import { useEffect, useState } from 'react';
import { addInventoryItem, editInventoryItem } from "../../controller/item"

const ItemForm = ({initial, mode, handlemessage}) => {

  console.log("Initial is: ", initial);

  const [form] = Form.useForm();
  const [isTablet, setIsTablet] = useState(initial !== null ? initial.itemDivisions > 0 ? true : false : false);
  console.log("Initail: ", initial);

  const handleSubmit = async (val) => {
    if (isTablet && (val.itemDivisions === 0 || val.itemDivisions === null)) {message.error("Enter Division of " + val.name);}
    else {
      console.log(val);
      let item = {
        name: val.name.toUpperCase(),
        itemPrice: val.price,
        // available: val.available
        quantity: val.quantity,
        itemDivisions: isTablet ? val.itemDivisions : 0,
        subQuantity: isTablet ? val.subQuantity : 0
      }
      let {msg, res} = mode === "Add" ? await handleAdd(item) : await handleEdit(item);
      handlemessage(msg, res);
    }
  }

  const handleAdd = async (item) => {
    let res = await addInventoryItem(item);
    if (res.data === 200){
    return {msg:"Item: " + item.name + " added successfully.", res:res.data};
    }
    else {
      return {msg: "Error adding the item: " + item.name + ".", res:res.data};
    }
  }

  const handleEdit = async (item) => {
    let res = await editInventoryItem({...item, id: initial.key});
    console.log(res);
    if (res.data === 200){
      return {msg:"Item: " + item.name + " updated successfully.", res:res.data};
    }
    else {
      return {msg: "Error updating the item: " + item.name + ".", res: res.data};
    }
  }

  useEffect(()=>{
    form.resetFields();
  })

  useEffect(() => {

  }, [isTablet])

  return (
    <>
      <Form
        style={{display:'flex'}}
        form={form}
        initialValues={
          // initial ? {name: initial.name, price: initial.price, available: initial.available === "Yes" ? true : false, } 
          initial ? initial 
          : {name:"", price:"", itemDivisions: 0, quantity: 0, subQuantity: 0, }
        }
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row justify='center' style={{display: 'flex', flexDirection:'row'}} gutter={[24, 24]} align='middle'>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              required
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              required
            >
              <Input type="number" min={0}/>
            </Form.Item>
          </Col>
          <Col span={12} style={{display:'flex', justifyContent:'center'}}>
            <Form.Item>
              <Select 
                defaultValue={isTablet ? "TABLET" : "OTHER"}
                onSelect={(val) => setIsTablet(val==="TABLET" ? true : false)} 
                showArrow={false} 
                style={{width:'100px'}}
              >
                <Select.Option value="OTHER">Other</Select.Option>
                <Select.Option value="TABLET">Tablet</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row style={{marginBottom:'-15px'}}>
              <Col span={8} style={{display:'flex', justifyContent:'center'}}>Quantity</Col>
              <Col span={8} style={{display:'flex', justifyContent:'center'}}>Sub Quantity</Col>
              <Col span={8} style={{display:'flex', justifyContent:'center'}}>Item Divisions</Col>
            </Row>
          </Col>
          <Col span={24} style={{display:'flex'}}>
            <Form.Item
              // style={{width:'30%'}}
              name="quantity"
              required
            >
              <Input type='number' placeholder='Quantity' min={0}/>
            </Form.Item>
            <Form.Item
              // style={{width:'30%'}}
              name="subQuantity"
              required
            >
              <Input type='number' placeholder='Sub Quantity' disabled={!isTablet} min={0}/>
            </Form.Item>
            <Form.Item
              // style={{width:'30%'}}
              name="itemDivisions"
              required
            >
              <Input type='number' placeholder='Item Divisions' disabled={!isTablet} min={0}/>
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              name="available"
              valuePropName="checked"
            >
              <Checkbox>Available</Checkbox>
            </Form.Item>
          </Col> */}
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

export default ItemForm