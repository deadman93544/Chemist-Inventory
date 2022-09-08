import { Input } from "antd"
import { useState } from "react";
import {AiOutlineSearch} from 'react-icons/ai'

// const {Search} = Input

const TableSearchBar = ({handleChange}) => {

  const [value, setValue] = useState('')

  const onChange = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value)
    handleChange(e.target.value.toUpperCase())
  }
  
  return (
    <>
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          // color: "rgb(128, 28, 186)",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          border: "1px solid grey",
          padding: "6px 20px",
          borderRadius: "20px",
        }}
      >
        <AiOutlineSearch fontSize={20} />
        <Input
          placeholder="Search here..."
          bordered={false}
          style={{ flexGrow: 1 }}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default TableSearchBar