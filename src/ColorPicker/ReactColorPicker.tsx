import { Saturation } from "./Saturation"
import { HueBar } from "./HueBar"
import { Fields } from "./Fields"
// import { ColorObject } from '../picker-utils/index'
import { ColorConverter, parse, convert } from '@wilfredlopez/color-converter'
import classes from './colorPicker.module.css'
import { useState, useMemo } from 'react'
import selectClass from '../utils/selectClass'

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


export interface ColorPickerClasses {
    container?: string
    controlsContainer?: string
    saturation?: {
        container?: string
        saturationCursor?: string
        canvas?: string
    }
    hueBar?: {
        container?: string,
        cursorClass?: string
    },
    fields?: {
        container?: string,
        inputs?: string
    }
}






function parseColor(colorToParse?: string | ColorConverter) {
    if (colorToParse instanceof ColorConverter) {
        return colorToParse.hexString()
    }
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


const ReactColorPicker = ({ width = 400, height = width, color, onChange, hideControls, pickerClasses = {} }: ColorPickerProps): JSX.Element => {
    const parsedColor = useMemo(() => parseColor(color), [color])

    const [selectedColor, setSelectedColor] = useState(new ColorConverter(parsedColor))

    function handleChange(color: ColorConverter) {
        setSelectedColor(color)
        if (typeof onChange === 'function') {
            onChange(color.hexString(), color)
        }
    }


    return (
        <div className={selectClass([{ [classes.colorPicker]: !pickerClasses.container, [pickerClasses.container || ""]: true }])}>
            <Saturation
                canvasClass={pickerClasses.saturation?.canvas || ""}
                containerClass={pickerClasses.saturation?.container || ""}
                saturationCursorClass={pickerClasses.saturation?.saturationCursor || ""}

                width={width} height={height} color={selectedColor} setColor={handleChange} />
            <HueBar containerClass={pickerClasses.hueBar?.container} cursorClass={pickerClasses.hueBar?.cursorClass} width={width} color={selectedColor} setColor={handleChange} />
            {hideControls ? null :
                <div className={
                    selectClass([
                        {
                            [classes.colorPickerBody]: !pickerClasses.controlsContainer,
                            [pickerClasses.controlsContainer || ""]: true
                        }
                    ])
                } style={{
                    width: width + 'px',
                }}>
                    <Fields containerClass={pickerClasses.fields?.container} inputClass={pickerClasses.fields?.inputs} color={selectedColor} setColor={handleChange} />
                </div>
            }
        </div>
    )
}

export default ReactColorPicker