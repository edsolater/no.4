import React from 'react'

/**
 *
 * @param {object} props
 * @param {'two'|'three'} props.type
 * @param {React.CSSProperties} props.style
 */
export const Grid = ({ type, style: customizedStyle, ...props }) => {
  const gridStyle = {}
  if (type === 'two') {
    gridStyle.gridTemplateAreas = `
      "a a a"
      "b b b"
    `
  }
  return (
    <div
      style={{ display: 'grid', ...gridStyle, ...customizedStyle }}
      {...props}
    />
  )
}
