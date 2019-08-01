import React from 'react'

// 语义化标签，作用等同于 <div>
/**
 * 
 * @param {object} props 
 * @param {React.CSSProperties} props.style
 */
export function Box(props) {
  return <div {...props} />
}
