import React, { ComponentProps } from 'react';
import { GridItems } from '@app/components/GridItems';
import { Story } from '@storybook/react';
import { GridItem } from '@app/components/GridItem';
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/GridItem',
  component: GridItems,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof GridItem>> = (args) => <GridItem {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  name: `product`,
  photo: INDIDE_LOGO_GRID_ITEM_BASE64,
  price: '35€'
};

