# ReactColorPicker

React Color Picker Component

### `USE`

```tsx
import { render } from 'react-dom'
import { useState } from 'react'
import { ReactColorPicker } from 'react-color-picker'
//peer-dependency
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
        color={color}
        onChange={(color, colorConverter) => {
          setColor(color)
          setAllColors(colorConverter.all())
          console.log(colorConverter.toColorObject())
        }}
      />
      <p style={{ textAlign: 'center' }}>{color}</p>
      <div style={{ textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
        {allColors.map(c => {
          return (
            <div
              style={{
                background: `#${c.hex}`,
                color: c.getContrast().hexString(),
              }}
              key={c.hex}
            >
              #{c.hex}
            </div>
          )
        })}
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

### PROPS

```ts
export interface ColorPickerProps {
  /**
   * The width of the color picker.
   */
  width?: number
  /**
   * The height of the color picker.
   */
  height?: number
  /**
   * Color in the `ColorConverter` or color string.
   * @type { ColorConverter } ColorConverter `https://www.npmjs.com/package/@wilfredlopez/color-converter`
   */
  color?: string | ColorConverter
  /**
   * The function that accepts the updated `color` and a `colorConverter` as arguments.
   * @ColorConverter `https://www.npmjs.com/package/@wilfredlopez/color-converter`
   */
  onChange?: (color: string, convertedColor: ColorConverter) => void
}
```
