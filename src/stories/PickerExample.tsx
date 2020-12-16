import { useState } from 'react'
import React from 'react'
import { ColorConverter } from '@wilfredlopez/color-converter'
import ReactColorPicker from '../ColorPicker/ReactColorPicker'

function PickerExample() {
    const [color, setColor] = useState('red')
    const [allColors, setAllColors] = useState<ColorConverter[]>([])
    return (
        <div>
            <h1 style={{ textAlign: 'center', width: '100%' }}>React Color Picker</h1>
            <ReactColorPicker
                width={400}
                height={250}
                color={color} onChange={(color, colorConverter) => {
                    setColor(color)
                    console.log(colorConverter.all())
                    setAllColors(colorConverter.all())
                }} />
            <div style={{ textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
                {allColors.map(c => {
                    return <div style={{ background: `#${c.hex}`, color: c.getContrast().hexString() }} key={c.hex}>#{c.hex}</div>
                })}
            </div>
        </div>
    )
}

export default PickerExample
