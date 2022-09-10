import { TableProduct } from '@app/components/tables/TableProduct';
import { Product, ProductCategory, ProductStatus } from '@app/model/Product';
import { PRODUCTS_ENDPOINT } from '@app/services/Products';
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import withMock from 'storybook-addon-mock';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/TableProduct',
  component: TableProduct,
  decorators: [withMock],
};

const mockedProductsEndpoint = PRODUCTS_ENDPOINT;

const generateMockItems = (size: number) => {
  const array: Product[] = [];
  while (size-- > 0) {
    array.push({
      productId: `${size}`,
      name: `product #${size}`,
      description: "",
      category: ProductCategory.T_SHIRT,
      status: ProductStatus.IN_STOCK,
      price: 3500
    });
  }
  return array;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof TableProduct>> = (args) => <TableProduct {...args} />;


export const EmptyTable = Template.bind({});
EmptyTable.parameters = {
  mockData: [
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 200,
      response: {
        data: [],
      },
    },
  ]
};

export const TableWithData = Template.bind({});
TableWithData.parameters = {
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

export const Error = Template.bind({});
Error.parameters = {
  mockData: [
    {
      url: mockedProductsEndpoint,
      method: 'GET',
      status: 500,
      response: {
        data: [],
      },
    },
  ]
};

