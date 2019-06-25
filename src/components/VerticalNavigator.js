import React from 'react'

export default function VerticalNavigator({
  items = [
    {
      // r: 20,
      onClick(item, index) {
        console.log('item.r: ', item.r)
        return console.log(`click big circle ${index}`)
      }
    },
    {
      // r: 24,
      onClick(item, index) {
        console.log('item.r: ', item.r)
        return console.log(`click big circle ${index}`)
      }
    },
    {},
    {},
    {},
    {}
  ],
  activeItemIndex = 1,
  gutter,

  // 泛化性 Props
  width = 32,
  height,
  fill = 'hsla(0, 0%, 70%,0.2)',
  fill_hover = 'hsl(25, 98%, 70%)',
  fill_active = 'hsl(238, 98%, 70%)',
  element // 手动指定渲染组件(传递已激发的组件)
}) {
  return (
    <div style={{ width, height }}>
      {items.map((item, index) => (
        <svg
          viewBox="0 0 64 64"
          onClick={
            (item.onClick && (() => item.onClick(item, index))) ||
            (() => console.log(`click Indicator ${index}`))
          }
          style={{
            width: '100%',
            height: '100%',
            marginBottom: index !== items.length - 1 && gutter
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
            class={index === activeItemIndex && 'active'}
            fill={fill}
          >
            {element || <circle cx="32" cy="32" r={`${item.r || 16}`} />}
          </g>
        </svg>
      ))}
    </div>
  )
}
