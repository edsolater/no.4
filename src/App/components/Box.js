import React from 'react'
import { merge } from 'lodash'

/**
 *
 * @param {object} props
 * @param {*} props._DOMTag 使用的DOM标签名
 * @param {*} props.grid 开启grid特性，创造grid模板的配置参数
 * @param {*} props.gridSlot 开启grid特性，创造grid模板的配置参数
 * @param {React.CSSProperties} props.style
 */
export default function Box({ _DOMTag = 'div', grid, gridSlot, ...restProps }) {
  const featureProps = merge({}, useGrid(grid, gridSlot))
  return React.createElement(_DOMTag, merge(restProps, featureProps))
  // return <div {...merge(restProps, featureProps)} />
}

/**
 *
 * @param {{layoutType: string}} grid grid容器的配置
 * @param {{config:*}|number} gridSlot 应用在grid容器中的盒子的配置
 */
function useGrid(grid, gridSlot) {
  if (grid === undefined && gridSlot === undefined) return
  const setting = { style: {} }
  const gridSetting = {}

  if (grid) {
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
    merge(setting.style, { display: 'grid' }, gridSetting)
  }

  if (gridSlot) {
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
    merge(setting.style, gridSetting)
  }
  merge(setting.style, useGrid.style)

  return setting
}
