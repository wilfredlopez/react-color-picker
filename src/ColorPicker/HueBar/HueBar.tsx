import { useRef, useMemo, useCallback } from "react"
// import { getCoordinatesByHue, moveAt, getHueByCoordinates, changeHue } from "../picker-utils"
// import { ColorObject } from '../picker-utils/index'
import { canvasUtils, ColorConverter } from "@wilfredlopez/color-converter"
import classes from './huebar.module.css'
import selectClass from '../../utils/selectClass'

const { getCoordinatesByHue, moveAt, getHueByCoordinates, changeHue } = canvasUtils
export interface HueBarProps {
    width: number
    color: ColorConverter
    setColor: (color: ColorConverter) => void
    containerClass?: string
    cursorClass?: string
}

const { toColorObject } = canvasUtils


export const HueBar = ({ width, color, setColor, containerClass, cursorClass }: HueBarProps): JSX.Element => {
    const hueBarRef = useRef<HTMLDivElement>(null)
    const cursorPosition = useMemo(() => {
        const x = getCoordinatesByHue(color.hsbObject.hue, width)

        return x
    }, [color, width])

    const moveCursor = useCallback((x: number, shiftX: number): void => {
        const [newX] = moveAt({
            value: x,
            shift: shiftX,
            min: 0,
            max: width,
        })

        try {
            const newHue = getHueByCoordinates(newX, width)
            const up = toColorObject('hsb', {
                ...color.hsbObject, hue: newHue
            })
            const c = changeHue(up, newHue)
            setColor(new ColorConverter(c.hex))
        } catch (error) {

        }
    }, [color, setColor, width])

    const onMouseDown = useCallback((e: React.MouseEvent): void => {
        if (hueBarRef.current) {
            if (e.button !== 0) return

            document.getSelection()?.empty()

            const { left: shiftX } = hueBarRef.current.getBoundingClientRect()

            moveCursor(e.clientX, shiftX)

            const mouseMove = (e: MouseEvent): void => {
                moveCursor(e.clientX, shiftX)
            }
            const mouseUp = (): void => {
                document.removeEventListener("mousemove", mouseMove, false)
                document.removeEventListener("mouseup", mouseUp, false)
            }

            document.addEventListener("mousemove", mouseMove, false)
            document.addEventListener("mouseup", mouseUp, false)
        }
    }
        , [moveCursor])

    const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>): void => {
        if (hueBarRef.current) {
            if (e.touches.length === 0) return

            document.getSelection()?.empty()

            const { left: shiftX } = hueBarRef.current.getBoundingClientRect()
            const x = e.touches[0].pageX
            // const y = e.touches[0].pageY
            moveCursor(x, shiftX)

            const mouseMove = (e: TouchEvent): void => {
                if (e.touches.length > 0)
                    moveCursor(e.touches[0].pageX, shiftX)
            }
            const mouseUp = (): void => {
                document.removeEventListener('touchmove', mouseMove, false)
                document.removeEventListener('touchend', mouseUp, false)
            }

            document.addEventListener("touchmove", mouseMove, false)
            document.addEventListener("touchend", mouseUp, false)
        }
    }, [moveCursor])


    return (
        <div className={
            selectClass([
                {
                    [classes.hueBar]: !containerClass,
                    [containerClass || ""]: true
                }
            ])
        } ref={hueBarRef} style={{
            width: width,
            position: 'relative',
            backgroundImage: 'linear-gradient( to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0) )'
        }} onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        >
            <div className={
                selectClass([
                    {
                        [classes.hueBarCursor]: !cursorClass,
                        [cursorClass || ""]: true
                    }
                ])
            } style={{ left: cursorPosition, backgroundColor: `hsl(${color.hslObject.hue}, 100%, 50%)` }} />
        </div>
    )
}