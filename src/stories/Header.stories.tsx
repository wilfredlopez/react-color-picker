import React from 'react'

import { Header, HeaderProps } from './Header'
import { Story, Meta } from '@storybook/react/types-6-0'

export default {
  title: 'Example/Header',
  component: Header,
} as Meta

const Template: Story<HeaderProps> = (args: HeaderProps) => <Header {...args} />

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: false,
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {}
