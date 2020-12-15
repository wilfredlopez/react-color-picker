import { Saturation } from "./Saturation"
import { HueBar } from "./HueBar"
import { Fields } from "./Fields"
// import { ColorObject } from '../picker-utils/index'
import { ColorConverter, parse, convert } from '@wilfredlopez/color-converter'
import classes from './colorPicker.module.css'
import { useState, useMemo } from 'react'

// const { isValidHex, } = canvasUtils

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
     * Color in the `ColorObject`.
     */
    color?: string
    /**
     * The function that accepts the updated `ColorObject` as a single argument.
     */
    onChange?: (color: string, convertedColor: ColorConverter) => void
}

export interface ColorPickerBodyProps {
    width: number
}



function parseColor(colorToParse?: string) {
    const parsed = parse(colorToParse || '#3d7c7d')
    if (!parsed) return '#3d7c7d'
    const com = new ColorConverter()
    if (parsed.type === "rgb") {
        // [this.rgb, this.alpha] = [[r, g, b], a]
        com.rgb = parsed.values
        com.alpha = parsed.alpha
    } else {
        com.alpha = parsed.alpha
        com.rgb = convert.hsl.rgb(parsed.values).map(Math.round) as any
    }

    return com.hexString()
}


const ReactColorPicker = ({ width = 400, height = width, color, onChange }: ColorPickerProps): JSX.Element => {

    const parsedColor = useMemo(() => parseColor(color), [color])

    const [selectedColor, setSelectedColor] = useState(new ColorConverter(parsedColor))

    function handleChange(color: ColorConverter) {
        setSelectedColor(color)
        if (typeof onChange === 'function') {
            onChange(color.hexString(), color)
        }
    }

    return (
        <div className={classes.colorPicker}>
            <Saturation width={width} height={height} color={selectedColor} setColor={handleChange} />
            <div className={classes.colorPickerBody} style={{
                width: width + 'px',
            }}>
                <HueBar width={width} color={selectedColor} setColor={handleChange} />
                <Fields color={selectedColor} setColor={handleChange} />
            </div>
        </div>
    )
}

export default ReactColorPicker