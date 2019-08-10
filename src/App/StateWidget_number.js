import React from 'react'
import { Slider, InputNumber } from 'antd/es'

/**
 * @param {object} props
 * @param {number} props.value
 * @param {Function} [props.onChange]
 * @returns
 */
export default function StateWidget_number({ value, onChange = () => {} }) {
  return (
    <div>
      <InputNumber value={value} onChange={num => onChange(num)} />
      <Slider value={value} onChange={num => onChange(num)} />
    </div>
  )
}
