import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import { DateTimeRangePickerIlx } from '@app/components/common/DateTimeRangePickerIlx';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/DateTimeRangePickerIlx',
  component: DateTimeRangePickerIlx,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof DateTimeRangePickerIlx>> = (args) => <DateTimeRangePickerIlx {...args} />;

export const editable = Template.bind({});
editable.args = {
};
