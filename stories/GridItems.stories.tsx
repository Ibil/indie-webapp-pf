import { GridItems } from '@app/components/common/GridItems';
import { GridItemModel } from "@app/model/GridItemModel";
import { ProductCategory } from '@app/model/Product';
import { WEB_API_HOST } from '@app/services/common';
import { PRODUCTS_ENDPOINT } from '@app/services/Products';
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';
import withMock from 'storybook-addon-mock';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/GridItems',
  component: GridItems,
  decorators: [withMock],
};
const mockedProductsEndpoint = PRODUCTS_ENDPOINT + `&category=tshirt`;

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


export const OK = Template.bind({});
OK.args = {
  category: ProductCategory.T_SHIRT
};
OK.parameters = {
  mockData: [
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 200,
      response: {
        data: generateMockItems(20),
      },
    },
  ]
};

export const ERROR = Template.bind({});
ERROR.args = {
  category: ProductCategory.T_SHIRT
};
ERROR.parameters = {
  mockData: [
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 500,
      response: {
        data: generateMockItems(20),
      },
    },
  ]
};

// cant use api to mock same request twice.
/* export const refreshSuccess = Template.bind({});
refreshSuccess.args = {
  category: ProductCategory.T_SHIRT
};
refreshSuccess.parameters = {
  mockData: [
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 401,
      response: {
      },
    },
    {
      url: WEB_API_HOST + `auth/refresh`,
      method: 'POST',
      credentials: "include",
      status: 200,
      response: {
      },
    },
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 200,
      response: {
        data: generateMockItems(20),
      },
    }
  ]
}; */

export const refresFailSecondTime = Template.bind({});
refresFailSecondTime.args = {
  category: ProductCategory.T_SHIRT
};
refresFailSecondTime.parameters = {
  mockData: [
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 401,
      response: {
      },
    },
    {
      url: WEB_API_HOST + `auth/refresh`,
      method: 'POST',
      credentials: "include",
      status: 200,
      response: {
      },
    }
  ]
};

