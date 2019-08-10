import React from 'react'
import { Input } from 'antd/es'

/**
 * @param {object} props
 * @param {number} props.value
 * @param {Function} [props.onChange]
 * @returns
 */
export default function StateWidget_string({ value, onChange = () => {} }) {
  return <Input value={value} onChange={e => onChange(e.target.value)} />
}
