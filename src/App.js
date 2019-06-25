import React from 'react'
import * as componentItems from './components'

const components = Object.values(componentItems)

export default function App() {
  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: 10,
        justifyItems: 'center',
        alignItems: 'center'
      }}
    >
      {components.map((Component, idx) => (
        <div key={idx}>
          <div
            style={{
              background: 'hsla(0, 0%, 40%, 0.2)',
              width: 'max-content'
            }}
          >
            <Component />
          </div>
          <p>{Component.name}</p>
        </div>
      ))}
    </div>
  )
}
