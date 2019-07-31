import React from 'react'

/**
 *
 * @param {object} props
 * @param {'two'|'three'} props.type
 * @param {React.CSSProperties} props.style
 */
export function Flex({ type, style, ...props }) {
  /**
   * @type {React.CSSProperties}
   */
  const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return <div style={{ ...flex, ...style }} {...props} />
}
