import {Input, Form, Row, Col, Checkbox, Button} from 'antd'
import { useEffect } from 'react';
import { addInventoryItem, editInventoryItem } from "../../controller/item"

const ItemForm = ({initial, mode, handlemessage}) => {

  console.log("Initial is: ", initial);

  const [form] = Form.useForm();
  console.log("Initail: ", initial);

  const handleSubmit = async (val) => {
    console.log(val);
    let item = {
      name: val.name.toUpperCase(),
      itemPrice: val.price,
      available: val.available
    }
    let {msg, res} = mode === "Add" ? await handleAdd(item) : await handleEdit(item);
    handlemessage(msg, res);
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

  return (
    <>
      <Form
        style={{display:'flex'}}
        form={form}
        initialValues={
          initial ? {name: initial.name, price: initial.price, available: initial.available === "Yes" ? true : false} 
          : {name:"", price:"", available: true}
        }
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row justify='center' style={{display: 'flex', flexDirection:'row'}} gutter={[24, 24]} align='middle'>
          <Col span={12}>
            <Form.Item
              label="Medicine Name"
              name="name"
              required
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Medicine price"
              name="price"
              required
              
            >
              <Input type="number"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="available"
              valuePropName="checked"
            >
              <Checkbox>Available</Checkbox>
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

export default ItemForm