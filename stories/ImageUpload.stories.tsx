import { ImageUpload } from '@app/components/common/ImageUpload';
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/ImageUpload',
  component: ImageUpload,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ImageUpload>> = (args) => <ImageUpload {...args} />;

export const withData = Template.bind({});
withData.args = {
  fileName: `product a`,
  data: INDIDE_LOGO_GRID_ITEM_BASE64,
};


export const withoutData = Template.bind({});
withoutData.args = {};
