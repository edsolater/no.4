import React from 'react'
import { merge, assign } from 'lodash'

/**
 *
 * @param {object} props
 * @param {*} props._DOMTag 使用的DOM标签名
 * @param {boolean} props.inline 是否有 display: inline- 的特性
 * @param {*} props.grid 开启grid特性
 * @param {React.CSSProperties} props.style
 */
export default function Box({
  _DOMTag = 'div',
  inline = false,
  grid,
  flex,
  ...restProps
}) {
  const ref = React.useRef()
  React.useEffect(() => {
    if (grid) effect_grid(ref.current) // 这只是一个写法示例，如有真实案例，则删去此示例
  })

  const featureProps = merge(
    restProps,
    grid && feature_grid(grid),
    flex && feature_flex(flex)
  )
  if (inline) {
    const display = featureProps.style.display
    featureProps.style.display = `inline-${display || 'block'}`
  }

  return React.createElement(_DOMTag, assign(featureProps, { ref }))
}

/**
 *
 * @param {{layoutType: string}} userSetting flex容器的配置
 */
function feature_flex(userSetting) {
  const flexStyle = {}
  const [category, placeNum] =
    (Object(userSetting).layoutType || 'land_4').split('_') || []
  if (category === 'land') {
    if (placeNum === '4') {
      merge(flexStyle, {
        flexTemplateColumns: '1fr 1fr',
        flexTemplateRows: '1fr 1fr',
        overflow: 'hidden',
        height: '100%'
      })
    }
  }
  return merge(
    {},
    { style: { display: 'flex' } },
    { style: flexStyle },
    { style: userSetting.style }
  )
}
/**
 *
 * @param {{layoutType: string}} userSetting grid容器的配置
 */
function feature_grid(userSetting) {
  const gridStyle = {}
  const [category, placeNum] =
    (Object(userSetting).layoutType || 'land_4').split('_') || []
  if (category === 'land') {
    if (placeNum === '4') {
      merge(gridStyle, {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        overflow: 'hidden',
        height: '100%'
      })
    }
  }
  return merge(
    {},
    { style: { display: 'grid' } },
    { style: gridStyle },
    { style: userSetting.style }
  )
}

// 这只是一个写法示例，如有真实案例，则删去此示例
async function effect_grid(el) {
  // console.log('el: ', el)
}
