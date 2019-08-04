import React from 'react'
import Box from './Box'

/**
 * 语义盒子的目的：能够更快、更直观地从代码中读出
 *
 * @param {object} props
 * @param {React.CSSProperties} props.style
 */
export default function Grid(props) {
  return <Box {...props}/>
}
