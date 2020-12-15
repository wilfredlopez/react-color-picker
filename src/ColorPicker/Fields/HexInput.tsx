import React from 'react'
import { ColorConverter } from '@wilfredlopez/color-converter'
interface Props {
    color: ColorConverter
    value: string
    onFocus: React.DOMAttributes<HTMLInputElement>['onFocus']
    onChange: React.DOMAttributes<HTMLInputElement>['onChange']
    onBlur: React.DOMAttributes<HTMLInputElement>['onBlur']
    className: string
}

const HexInput = ({ className, color, value, onBlur, onChange, onFocus }: Props) => {
    return (
        <input className={className}
            style={{
                backgroundColor: `${color.hexString()}`,
                color: `${color.getContrast().hexString()}`,
            }}
            type="text"
            value={value}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

export default HexInput
