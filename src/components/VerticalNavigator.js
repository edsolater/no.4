import React from 'react'

export default function VerticalNavigator({
  items = [
    {
      // r: 20,
      onClick(item, idx) {
        console.log('item.r: ', item.r)
        return console.log(`click big circle ${idx}`)
      }
    },
    {
      // r: 24,
      onClick(item, idx) {
        console.log('item.r: ', item.r)
        return console.log(`click big circle ${idx}`)
      }
    },
    {},
    {},
    {},
    {}
  ],
  activeItemIdx = 1,
  gap,

  // 泛化性 Props
  width = 32,
  height,
  fill = 'hsla(0, 0%, 70%, 0.2)',
  fill_hover = 'hsl(25, 98%, 70%)',
  fill_active = 'hsl(238, 98%, 70%)',
  element // 手动指定渲染组件(传递已激发的组件)
}) {
  return (
    <div style={{ width, height }}>
      {items.map((item, idx) => (
        <svg
          key={idx}
          viewBox="0 0 64 64"
          onClick={
            (item.onClick && (() => item.onClick(item, idx))) ||
            (() => console.log(`click Indicator ${idx}`))
          }
          style={{
            width: '100%',
            height: '100%',
            marginBottom: idx !== items.length - 1 && gap
          }}
        >
          <style>
            {`
              #indicator {
                transition: 400ms all ease
              }
              #indicator:hover {
                fill: ${fill_hover};
              }
              #indicator.active {
                fill: ${fill_active};
              }
              `}
          </style>
          <g
            id="indicator"
            className={idx === activeItemIdx ? 'active' : ''}
            fill={fill}
          >
            {element || <circle cx="32" cy="32" r={`${item.r || 16}`} />}
          </g>
        </svg>
      ))}
    </div>
  )
}
