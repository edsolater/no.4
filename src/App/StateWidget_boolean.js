import React from 'react'
import { Switch } from 'antd/es'

/**
 * @param {object} props
 * @param {number} props.value
 * @param {Function} [props.onChange]
 * @returns
 */
export default function StateWidget_boolean({ value, onChange = () => {} }) {
  return <Switch value={value} onChange={checked => onChange(checked)} />
}
