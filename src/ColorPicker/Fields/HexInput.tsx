import React from 'react'
import { ColorConverter } from '@wilfredlopez/color-converter'
import classes from './fields.module.css'
interface Props {
    color: ColorConverter
    value: string
    onFocus: React.DOMAttributes<HTMLInputElement>['onFocus']
    onChange: React.DOMAttributes<HTMLInputElement>['onChange']
    onBlur: React.DOMAttributes<HTMLInputElement>['onBlur']
}

const HexInput = ({ color, value, onBlur, onChange, onFocus }: Props) => {
    return (
        <input className={classes.fieldsInput}
            style={{
                backgroundColor: `${color.hexString()}`,
                color: `${color.getContrast().hexString()}`,
                borderRadius: '0 5px 5px 0'
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
