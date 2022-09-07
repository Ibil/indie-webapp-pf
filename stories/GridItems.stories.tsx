import React, { ComponentProps } from 'react';
import { GridItems } from '@app/components/common/GridItems';
import { Story } from '@storybook/react';
import { GridItemModel } from "@app/model/GridItemModel";
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';
import withMock from 'storybook-addon-mock';
import { ProductCategory } from '@app/model/Product';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/GridItems',
  component: GridItems,
  decorators: [withMock],
};

const generateMockItems = (size: number) => {
  const array: GridItemModel[] = [];
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
  category: ProductCategory.T_SHIRT
};

FirstStory.parameters = {
  mockData: [
      {
          url: 'https://api-store-indielisboa.herokuapp.com/v1/products?limit=100&page=0&stock=false',
          method: 'GET',
          status: 200,
          response: {
              data: generateMockItems(20),
          },
      },
  ]
};