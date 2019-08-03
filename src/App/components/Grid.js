import React from 'react'
import { toFlatArray } from './extractors';

/**
 *
 * @param {object} props
 * @param {'two'|'three'} props.type
 * @param {React.CSSProperties} props.style
 */
export const Grid = ({ type, style, children, ...props }) => {
  const flatChildren = toFlatArray(children) 
  const grid = {
    display: 'grid',
    gridTemplateColumns: '1fr .3fr',
    gridTemplateRows: '300px calc(100% - 300px)',
    height: '100%',
    justifyItems: 'center'
  }
  return <div style={{ ...grid, ...style }} {...props}>{children}</div>
}