import React from 'react'
import { merge, assign } from 'lodash'

/**
 *
 * @param {object} props
 * @param {*} props._DOMTag 使用的DOM标签名
 * @param {*} props.grid 开启grid特性，创造grid模板的配置参数
 * @param {*} props.gridSlot 开启grid特性，创造grid模板的配置参数
 * @param {React.CSSProperties} props.style
 */
export default function Box({
  _DOMTag = 'div',
  inline = false,
  grid,
  flex,
  gridSlot,
  ...restProps
}) {
  const ref = React.useRef()
  React.useEffect(() => {
    if (grid) effect_grid(ref.current) // 这只是一个写法示例，如有真实案例，则删去此示例
  })
  const featureProps = merge(
    restProps,
    grid && feature_grid(grid, inline),
    flex && feature_flex(flex, inline),
    gridSlot && feature_gridSlot(gridSlot)
  )
  return React.createElement(_DOMTag, assign(featureProps, { ref }))
}

/**
 *
 * @param {{layoutType: string}} flex flex容器的配置
 */
function feature_flex(flex, inline) {
  const setting = { style: {} }
  const flexSetting = {}
  const [category, placeNum] =
    (Object(flex).layoutType || 'land_4').split('_') || []
  if (category === 'land') {
    if (placeNum === '4') {
      merge(flexSetting, {
        flexTemplateColumns: '1fr 1fr',
        flexTemplateRows: '1fr 1fr',
        overflow: 'hidden',
        height: '100%'
      })
    }
  }
  merge(
    setting.style,
    { display: `${inline ? 'inline-' : ''}flex` },
    flexSetting,
    flex.style
  )
  return setting
}
/**
 *
 * @param {{layoutType: string}} grid grid容器的配置
 */
function feature_grid(grid, inline) {
  const setting = { style: {} }
  const gridSetting = {}
  const [category, placeNum] =
    (Object(grid).layoutType || 'land_4').split('_') || []
  if (category === 'land') {
    if (placeNum === '4') {
      merge(gridSetting, {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        overflow: 'hidden',
        height: '100%'
      })
    }
  }
  merge(
    setting.style,
    { display: `${inline ? 'inline-' : ''}grid` },
    gridSetting,
    grid.style
  )
  return setting
}

/**
 *
 * @param {number|[number,number]} gridSlot 应用在grid容器中的盒子的配置
 */
function feature_gridSlot(gridSlot) {
  const setting = { style: {} }
  const gridSetting = {}
  if (Array.isArray(gridSlot) && gridSlot.length === 2) {
    // TODO:我觉得lodash有更简单的解决方式，但是没找到
    merge(gridSetting, {
      gridArea: `${gridSlot[0] || 1}/${gridSlot[1] || 1}`
    })
  } else if (typeof gridSlot === 'number') {
    // 跟前面的if条件很不对称，可读性不强，要改写
    merge(gridSetting, {
      gridArea: `${gridSlot}`
    })
  }
  merge(setting.style, gridSetting, feature_grid.style)
  return setting
}

// 这只是一个写法示例，如有真实案例，则删去此示例
async function effect_grid(el) {
  // console.log('el: ', el)
}
