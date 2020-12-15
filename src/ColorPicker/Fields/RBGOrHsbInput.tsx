import React, { useMemo } from 'react'
import { ColorConverter, ColorModels } from '@wilfredlopez/color-converter'
import classes from './fields.module.css'

interface Props {
    color: ColorConverter
    onChange: React.DOMAttributes<HTMLInputElement>['onChange']
    colorModel: ColorModels
}

const RBGOrHsbInput = ({ color, onChange, colorModel }: Props) => {

    const sharedStyles = useMemo(() => ({ backgroundColor: `${color.hexString()}33`, color: `${color.getContrast()}`, }), [color])


    return (
        <>
            <input className={classes.fieldsInput}
                id={colorModel === "rgb" ? "red" : "hue"}
                style={sharedStyles}
                type="number"
                value={(colorModel === "rgb" ? color.rgbObject.red : color.hsbObject.hue).toFixed()}
                onChange={onChange}
            />
            <input className={classes.fieldsInput}
                id={colorModel === "rgb" ? "green" : "saturation"}
                style={sharedStyles}
                type="number"
                value={(colorModel === "rgb" ? color.rgbObject.green : color.hsbObject.saturation).toFixed()}
                onChange={onChange}
            />
            <input className={classes.fieldsInput}
                id={colorModel === "rgb" ? "blue" : "brightness"}
                style={sharedStyles}
                type="number"
                value={(colorModel === "rgb" ? color.rgbObject.blue : color.hsbObject.brightness).toFixed()}
                onChange={onChange}
            />
        </>
    )
}

export default RBGOrHsbInput
