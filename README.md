# ReactColorPicker

React Color Picker Component written in typescript.

[![npm version](https://badge.fury.io/js/react-color-palette-picker.svg)](https://badge.fury.io/js/react-color-palette-picker)

[Documentation/Homepage](https://wilfredlopez.github.io/react-color-picker/)

## Instalation

### NPM

```
npm install react-color-palette-picker
```

### Yarn

```
yarn add react-color-palette-picker
```

### unpkg

```html
<!-- ColorConverter -->
<script
  crossorigin="anonymous"
  src="https://unpkg.com/@wilfredlopez/color-converter@1.0.8/dist/index.umd.js"
></script>
<!-- ReactColorPicker -->
<script src="https://unpkg.com/react-color-palette-picker@latest/build/index.umd.js"></script>
```

### PROPS

```ts
interface ColorPickerProps {
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
  /**
   * classNames to override the defaults
   */
  pickerClasses?: ColorPickerClasses
  /**
   * Show or hide the hex and rgb inputs.
   */
  hideControls?: boolean
}

interface ColorPickerClasses {
  container?: string
  controlsContainer?: string
  saturation?: {
    container?: string
    saturationCursor?: string
    canvas?: string
  }
  hueBar?: {
    container?: string
    cursorClass?: string
  }
  fields?: {
    container?: string
    inputs?: string
  }
}
```

### `USE`

```tsx
import { render } from 'react-dom'
import { useState } from 'react'
import { ReactColorPicker } from 'react-color-palette-picker'
//peer-dependency
import { ColorConverter } from '@wilfredlopez/color-converter'

//Default Styles or use your own by providing prop `pickerClasses`
import 'react-color-palette-picker/build/index.css'

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

### UMD Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <!-- STYLES -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/react-color-palette-picker@latest/build/index.css"
  />

  <body>
    <div id="root"></div>
    <!-- React, ReactDOM -->
    <script
      crossorigin="anonymous"
      src="https://unpkg.com/react@latest/umd/react.production.min.js"
    ></script>
    <script
      crossorigin="anonymous"
      src="https://unpkg.com/react-dom@latest/umd/react-dom.production.min.js"
    ></script>
    <!-- ColorConverter -->
    <script
      crossorigin="anonymous"
      src="https://unpkg.com/@wilfredlopez/color-converter@1.0.8/dist/index.umd.js"
    ></script>
    <!-- ReactColorPicker -->
    <script src="https://unpkg.com/react-color-palette-picker@latest/build/index.umd.js"></script>
    <script>
      const ReactColorPicker = window.ReactColorPicker

      const RootElement = document.getElementById('root')
      ReactDOM.render(React.createElement(ReactColorPicker), RootElement)
    </script>
  </body>
</html>
```
