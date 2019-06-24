import React from 'react'
import 'styled-components/macro'

export default function VerticalNavigator({ itemNumber, width, height }) {
  return (
    <svg
      width={width || 64}
      height={height || 64 * itemNumber}
      viewBox="0 0 64 128"
    >
      <Indicator index={0} />
      <Indicator y={64} index={1} />
    </svg>
  )
}
function Indicator({ x = 0, y = 0, index = 0, ...rest }) {
  return (
    <svg
      x={`${x}`}
      y={`${y}`}
      height={64}
      viewBox="0 0 64 64"
      onClick={() => console.log(`click big circle ${index}`)}
      css={`
        circle {
          fill: hsla(${index * 30}, 60%, 70%, 0.4);
        }

        :hover {
          circle {
            fill: blue;
          }
        }
      `}
      {...rest}
    >
      <circle cx="32" cy="20" r="20" />
    </svg>
  )
}
