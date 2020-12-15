import { useRef, useMemo, useEffect, useCallback } from "react"
import React from 'react'
// import { getCoordinatesByColor, moveAt, getColorByCoordinates, ColorObject } from "../picker-utils"
import { canvasUtils, ColorConverter } from '@wilfredlopez/color-converter'
import classes from './saturation.module.css'
import selectClass from '../../utils/selectClass'
const { getCoordinatesByColor, moveAt, getColorByCoordinates, } = canvasUtils

export interface SaturationProps {
    width: number
    height: number
    color: ColorConverter
    setColor: (color: ColorConverter) => void
    containerClass: string
    saturationCursorClass: string
    canvasClass: string
}


export const Saturation = ({ canvasClass, saturationCursorClass, containerClass, width, height, color, setColor }: SaturationProps): JSX.Element => {
    const paletteRef = useRef<HTMLCanvasElement>(null)

    const cursorPosition = useMemo(() => {
        const [x, y] = getCoordinatesByColor(color.toColorObject(), width, height)

        return { x, y }
    }, [color, width, height])

    useEffect(() => {
        const drawPalette = (): void => {
            if (paletteRef.current) {
                const ctx = paletteRef.current.getContext("2d")

                if (ctx) {
                    const saturation = ctx.createLinearGradient(0, height / 2, width, height / 2)

                    saturation.addColorStop(0, "white")
                    const hsl = color.hslObject
                    saturation.addColorStop(1, `hsl(${hsl.hue}, 100%, 50%)`)

                    ctx.fillStyle = saturation
                    ctx.fillRect(0, 0, width, height)

                    const brightness = ctx.createLinearGradient(width / 2, 0, width / 2, height)

                    brightness.addColorStop(0, "transparent")
                    brightness.addColorStop(1, "black")

                    ctx.fillStyle = brightness
                    ctx.fillRect(0, 0, width, height)
                }
            }
        }

        if (paletteRef.current) drawPalette()


    }, [width, height, color])


    const moveCursor = useCallback((x: number, y: number, shiftX: number, shiftY: number): void => {
        let [newX, newY] = moveAt(
            { value: x, shift: shiftX, min: 0, max: width },
            { value: y, shift: shiftY, min: 0, max: height }
        )

        if (newX > width) {
            newX = width
        }
        if (newY > height) {
            newY = height
        }
        if (newY === height && newX === width) {
            return
        }
        const hue = color.hslObject.hue
        const newColor = getColorByCoordinates(hue, newX, newY, width, height)
        setColor(new ColorConverter(newColor.hex, color.alpha, color.type, color.weight))
    }
        , [color, height, width, setColor])

    const onMouseDown = useCallback((e: React.MouseEvent): void => {
        if (paletteRef.current) {
            if (e.button !== 0) return

            document.getSelection()?.empty()

            let { left: shiftX, top: shiftY } = paletteRef.current.getBoundingClientRect()

            moveCursor(e.clientX, e.clientY, shiftX, shiftY)

            const mouseMove = (e: MouseEvent): void => {
                if (e.button !== 0) return
                if (paletteRef.current) {
                    const { left, top } = paletteRef.current.getBoundingClientRect()
                    shiftX = left
                    shiftY = top
                }
                moveCursor(e.clientX, e.clientY, shiftX, shiftY)
            }
            const mouseUp = (): void => {
                document.removeEventListener("mousemove", mouseMove, false)
                document.removeEventListener("mouseup", mouseUp, false)
            }

            document.addEventListener("mousemove", mouseMove, false)
            document.addEventListener("mouseup", mouseUp, false)
        }
    }, [moveCursor])

    const onTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>): void => {
        if (paletteRef.current) {
            if (e.touches.length === 0) return

            document.getSelection()?.empty()

            const { left: shiftX, top: shiftY } = paletteRef.current.getBoundingClientRect()
            const x = e.touches[0].pageX
            const y = e.touches[0].pageY

            moveCursor(x, y, shiftX, shiftY)

            const toucheMove = (e: TouchEvent): void => {
                if (e.touches.length === 0) return
                moveCursor(e.touches[0].pageX, e.touches[0].pageY, shiftX, shiftY)
            }
            const mouseUp = (): void => {
                document.removeEventListener('touchmove', toucheMove, false)
                document.removeEventListener('touchend', mouseUp, false)
            }

            document.addEventListener("touchmove", toucheMove, false)
            document.addEventListener("touchend", mouseUp, false)
        }
    }
        , [moveCursor])

    return (
        <div className={selectClass([{
            [classes.saturation]: !containerClass,
            [containerClass || ""]: !!containerClass
        }])}>
            <canvas className={canvasClass} ref={paletteRef} width={width} height={height}
                onTouchStart={onTouchStart}
                onMouseDown={onMouseDown} />
            <div className={
                selectClass([{
                    [classes.saturationCursor]: !saturationCursorClass,
                    [saturationCursorClass || ""]: !!saturationCursorClass,
                }])

            }
                style={{ left: cursorPosition.x, top: cursorPosition.y, backgroundColor: color.hexString() }} />
        </div>
    )
}