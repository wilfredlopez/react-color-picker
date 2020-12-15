import React from 'react'
import { useRef, useState, useEffect, useCallback } from "react"
// import { ColorModels } from "../picker-utils"
import { ColorModels } from "@wilfredlopez/color-converter"
import classes from './dropdown.module.css'

export interface ColorModelsDropDownProps {
    model: ColorModels
    setModel: (model: ColorModels) => void
}

const models: ColorModels[] = ["hex", "rgb"] //["hex", "rgb", "hsb"]

export const ColorModelsDropDown = ({ model, setModel }: ColorModelsDropDownProps): JSX.Element => {
    const dropDownRef = useRef<HTMLDivElement>(null)

    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const onClickOutside = (): void => {
            if (isExpanded) setIsExpanded(false)
        }

        document.addEventListener("click", onClickOutside, false)

        return (): void => {
            document.removeEventListener("click", onClickOutside, false)
        }
    }, [isExpanded])

    const onTriggerClick = useCallback((): void => {
        setIsExpanded(!isExpanded)
    }, [isExpanded])

    const onModelClick = useCallback((model: ColorModels): void => {
        setModel(model)
    }, [setModel])

    return (
        <div className={classes.dropdown} ref={dropDownRef}>
            <div className={classes.dropdownTrigger} onClick={onTriggerClick}>{model.toUpperCase()}</div>
            <div className={classes.dropdownMenu} aria-expanded={isExpanded}>
                {models.map((model) => (
                    <div className={classes.dropdownMenuModel} key={model} onClick={(): void => onModelClick(model)}>
                        {model.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    )
}