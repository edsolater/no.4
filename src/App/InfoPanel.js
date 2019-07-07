import React from 'react'
import * as icons from './asset/reactComponentIcons'
import * as myLibrary from '../my-library'
import { Icon } from 'antd/es'

const InfoPanel = ({ selectedItemInfo }) => {
  const { info } = selectedItemInfo
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      hello
    </div>
  )
}

export default InfoPanel
