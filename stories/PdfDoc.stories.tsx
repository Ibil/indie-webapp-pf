import React, { ComponentProps } from 'react';
import { PdfDoc } from '@app/components/common/PdfDoc';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/PdfDoc',
  component: PdfDoc,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof PdfDoc>> = (args) => <PdfDoc {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
};

