import React from 'react'
import { useState } from 'react'
import { ReactColorPicker } from './ColorPicker'
import { ColorConverter } from '@wilfredlopez/color-converter'

function App() {
  const [color, setColor] = useState('red')
  const [allColors, setAllColors] = useState<ColorConverter[]>([])
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>React Color Picker</h1>
      <ReactColorPicker
        width={400}
        height={250}
        color={color} onChange={(color, colorConverter) => {
          setColor(color)
          console.log(colorConverter.toColorObject())
          setAllColors(colorConverter.all())
        }} />
      <p style={{ textAlign: 'center' }}>{color}</p>
      <div style={{ textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
        {allColors.map(c => {
          return <div style={{ background: `#${c.hex}`, color: c.getContrast().hexString() }} key={c.hex}>#{c.hex}</div>
        })}
      </div>
    </div>
  )
}

export default App
