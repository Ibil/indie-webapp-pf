import React, { ComponentProps } from 'react';
import { SaleList } from '@app/components/SaleList';
import { Story } from '@storybook/react';
import { GridItem } from "@app/components/GridItem";
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/SaleList',
  component: SaleList,
};

const generateMockItems = (size: number) => {
  const array: GridItem[] = [];
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
const Template: Story<ComponentProps<typeof SaleList>> = (args) => <SaleList {...args} />;


export const FirstStory = Template.bind({});
FirstStory.args = {
};

