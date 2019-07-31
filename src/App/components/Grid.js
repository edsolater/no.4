import React from 'react'

/**
 *
 * @param {object} props
 * @param {'two'|'three'} props.type
 * @param {React.CSSProperties} props.style
 */
export const Grid = ({ type, style, ...props }) => {
  const grid = { display: 'grid' }
  if (type === 'two') {
    grid.gridTemplateAreas = `
      "a a a"
      "b b b"
    `
  }
  return (
    <div
      style={{  ...grid, ...style }}
      {...props}
    />
  )
}
