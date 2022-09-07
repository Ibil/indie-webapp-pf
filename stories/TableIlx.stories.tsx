import React, { ComponentProps } from 'react';
import { Repository, TableIlx } from '@app/components/common/TableIlx';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/TableIlx',
  component: TableIlx,
};

/* const generateMockItems = (size: number) => {
  const array: Product[] = [];
  while (size-- > 0) {
    array.push({
      name: `product #${size}`,
      price: '35€'
    });
  }
  return array;
} */

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof TableIlx>> = (args) => <TableIlx {...args} />;


export const EmptyTable = Template.bind({});

export const TableWithData = Template.bind({});

const rowData: Repository[] = [
  { name: 'one', branches: 'two', prs: 'a', workspaces: 'four', price: 'five' },
  { name: 'a', branches: 'two', prs: 'k', workspaces: 'four', price: 'five' },
  { name: 'p', branches: 'two', prs: 'b', workspaces: 'four', price: 'five' }
];

const columnNames = {
  name: 'Repositories table header that goes on for a long time.',
  branches: 'Branches table header that goes on for a long time.',
  prs: 'Pull requests table header that goes on for a long time.',
  workspaces: 'Workspaces table header that goes on for a long time.',
  price: 'price'
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
const getSortableRowValues = 
  ({ name, branches, prs, workspaces, price }: Repository):
  (string | number)[] =>
  [name, branches, prs, workspaces, price];

EmptyTable.args = {
  columnNames,
  rowData: [],
  getSortableRowValues
};

TableWithData.args = {
  columnNames,
  rowData,
  getSortableRowValues
};
