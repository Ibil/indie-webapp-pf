import React, { ComponentProps } from 'react';
import { CartView } from '@app/components/CartView';
import { Story } from '@storybook/react';
import { GridItemModel } from "@app/model/GridItemModel";
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/SaleList',
  component: CartView,
};

const generateMockItems = (size: number) => {
  const array: GridItemModel[] = [];
  while (size-- > 0) {
    array.push({
      name: `product #${size}`,
      image: INDIDE_LOGO_GRID_ITEM_BASE64,
      price: '35€'
    });
  }
  return array;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof CartView>> = (args) => <CartView {...args} />;


export const FirstStory = Template.bind({});
FirstStory.args = {
};

