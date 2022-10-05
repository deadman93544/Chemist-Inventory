import {useEffect, useState} from 'react'
import { Button, Card, Col, Divider, Input, InputNumber, Layout, Row ,Select,Table,Typography} from 'antd'
import { generateCheckSum } from '../../controller/transaction';
const { Meta } = Card;
const {Title}=Typography
export const Sales = () => {

  return (
    <>
      <Layout>
        <Layout.Header>

        </Layout.Header>
        <Layout.Content>
          Sales
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