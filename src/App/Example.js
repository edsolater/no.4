import React from 'react'
import { Box } from './components'
import Markdown from 'react-markdown'

export function Example({ selectedComponent }) {
  return <Box>{selectedComponent.example}</Box>
}
