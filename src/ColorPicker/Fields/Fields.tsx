import { useState, useEffect, useCallback, useMemo } from 'react'
// import { ColorModels, isValidHex, toColorObject, isValidRgb, isValidHsb } from "../picker-utils"
import { canvasUtils, ColorConverter, ColorModels, HsbObject } from "@wilfredlopez/color-converter"
import { ColorModelsDropDown } from "../ColorModelsDropDown"
import HexInput from './HexInput'
import RBGOrHsbInput from './RBGOrHsbInput'
import classes from './fields.module.css'
import selectClass from '../../utils/selectClass'

const { isValidHex, toColorObject, isValidRgb, isValidHsb } = canvasUtils

export interface FieldsProps {
    color: ColorConverter
    setColor: (color: ColorConverter) => void
    containerClass?: string
    inputClass?: string
}


export const Fields = ({ color, setColor, containerClass, inputClass }: FieldsProps): JSX.Element => {
    const [value, setValue] = useState(color.hexString())
    const [inputted, setInputted] = useState(false)
    const [colorModel, setColorModel] = useState<ColorModels>("hex")


    const currentInputClass = useMemo(() => selectClass([
        {
            [classes.fieldsInput]: !inputClass,
            [inputClass || ""]: true
        }
    ]), [inputClass])

    useEffect(() => {
        if (!inputted) {
            setValue(color.hexString())
        }
    }, [inputted, color])

    const onFocus = useCallback((): void => {
        setInputted(true)
    }, [])

    const onBlur = useCallback((): void => {
        setInputted(false)
    }, [])

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const targetId = e.target.id
        const newValue = e.target.value
        if (colorModel === "hex") {
            if (isValidHex(newValue)) {
                // const updated = new ColorConverter(newValue)
                setColor(new ColorConverter(newValue))
                // setValue(updated)
            }
        } else if (colorModel === "rgb") {
            if (isValidRgb(newValue)) {
                const red = targetId === "red" ? Number(newValue) : color.rgb[0]
                const green = targetId === "green" ? Number(newValue) : color.rgb[1]
                const blue = targetId === "blue" ? Number(newValue) : color.rgb[2]
                const updated = new ColorConverter(toColorObject("rgb", { red, green, blue }).hex)
                setColor(updated)
                // setValue(updated)
            }
        } else if (colorModel === "hsb") {
            if (targetId === "hue") {
                if (isValidHsb(true, newValue)) {
                    const hue = Number(newValue)

                    const hsb: HsbObject = { ...color.hsbObject, hue: hue }
                    const newCol = toColorObject("hsb", hsb)
                    setColor(new ColorConverter(newCol.hex))
                    // setValue(new ColorConverter(newCol.hex))
                }
            } else {
                if (isValidHsb(false, newValue)) {
                    const saturation = targetId === "saturation" ? Number(newValue) : color.hsbObject.saturation
                    const brightness = targetId === "brightness" ? Number(newValue) : color.hsbObject.brightness

                    const hsb: HsbObject = { ...color.hsbObject, saturation: saturation, brightness: brightness }

                    setColor(new ColorConverter(toColorObject("hsb", hsb).hex))
                }
            }
        }
    }, [color, colorModel, setColor])

    return (
        <div className={selectClass([
            {
                [classes.fields]: !containerClass,
                [containerClass || ""]: true
            }
        ])}>
            <ColorModelsDropDown model={colorModel} setModel={setColorModel} />
            {colorModel === "hex" ? (
                <HexInput className={
                    currentInputClass
                } value={value} color={color} onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
            ) : (
                    <RBGOrHsbInput className={currentInputClass} colorModel={colorModel} color={color} onChange={onChange} />

                )}
        </div>
    )
}