import React from 'react'
import { merge, assign } from 'lodash'
import classNames from 'classnames'

/**
 *
 * @param {object} props
 * @param {string} props._DOMTag 使用的DOM标签名
 * @param {boolean} props.inline 是否有 display: inline- 的特性
 * @param {React.CSSProperties} props.style 普通style属性
 * @param {React.CSSProperties} props._style _style的属性能覆盖style的属性
 * @param {*} props.grid 开启grid特性
 * @param {*} props.flex 开启flex特性
 */
export default function Box({
  _DOMTag = 'div',
  className,
  _className,
  style,
  _style,
  ...restProps
}) {
  const ref = React.useRef()
  const props = merge(restProps, {
    style: merge(style, _style),
    className: classNames(className, _className)
  })
  return React.createElement(_DOMTag, assign(props, { ref }))
}

// 这只是一个写法示例，如有真实案例，则删去此示例
async function effect_grid(el) {
  // console.log('el: ', el)
}
