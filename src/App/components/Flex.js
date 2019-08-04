import React from 'react'
import Box from './Box'

/**
 * 语义盒子的目的：能够更快、更直观地从代码中读出
 */
export default function Flex({ flex, ...restProps }) {
  return <Box flex={flex || true} {...restProps} />
}
