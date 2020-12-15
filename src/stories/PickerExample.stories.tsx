import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import PickerExample from './PickerExample'
import * as HeaderStories from './ReactColorPicker.stories'

export default {
    title: 'Example/PickerExample',
    component: PickerExample,
} as Meta

const Template: Story<{}> = (args) => <PickerExample {...args} />

export const ExampleUser = Template.bind({})
ExampleUser.args = {
    ...HeaderStories.Default.args,
}

