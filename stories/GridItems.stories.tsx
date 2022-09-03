import React, { ComponentProps } from 'react';
import { GridItems } from '@app/components/GridItems';
import { Story } from '@storybook/react';
import { Product } from '@app/components/GridItem';
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/GridItems',
  component: GridItems,
};

const generateMockItems = (size: number) => {
  const array: Product[] = [];
  while (size-- > 0) {
    array.push({
      name: `product #${size}`,
      photo: INDIDE_LOGO_GRID_ITEM_BASE64,
      price: '35€'
    });
  }
  return array;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof GridItems>> = (args) => <GridItems {...args} />;


export const FirstStory = Template.bind({});
FirstStory.args = {
  products: generateMockItems(12)
};

