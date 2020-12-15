import React from 'react'

import ReactColorPicker, { ColorPickerProps } from '../ColorPicker/ReactColorPicker'
import { Story, Meta } from '@storybook/react/types-6-0'
import './react-color-picker-overrides.css'

export default {
    title: 'ReactColorPicker',
    component: ReactColorPicker,
} as Meta


const Template: Story<ColorPickerProps> = (args: ColorPickerProps) => <ReactColorPicker {...args} />


export const Default = Template.bind({})


export const GreenLarge = Template.bind({})
GreenLarge.args = {
    color: 'green',
    width: 500,
    height: 350
}

export const BlueSmall = Template.bind({})
BlueSmall.args = {
    color: 'blue',
    height: 200
}

export const NoControls = Template.bind({})
NoControls.args = {
    hideControls: true
}


export const ClassOverride = Template.bind({})
ClassOverride.args = {
    pickerClasses: {
        container: 'bgDark',
        hueBar: {
            container: 'barContainer'
        }
    }
}

