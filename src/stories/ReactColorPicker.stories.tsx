import React from 'react'

import ReactColorPicker, { ColorPickerProps } from '../ColorPicker/ReactColorPicker'
import { Story, Meta } from '@storybook/react/types-6-0'

export default {
    title: 'ReactColorPicker',
    component: ReactColorPicker,
} as Meta


const Template: Story<ColorPickerProps> = (args: ColorPickerProps) => <ReactColorPicker {...args} />


export const Default = Template.bind({})


export const GreenLarge = Template.bind({})
GreenLarge.args = {
    color: 'green',
}

export const BlueSmall = Template.bind({})
BlueSmall.args = {
    color: 'blue',
    height: 200
}
