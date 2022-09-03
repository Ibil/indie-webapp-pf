import React, { ComponentProps } from 'react';
import { Repository, TableIl } from '@app/components/TableIl';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/TableIl',
  component: TableIl,
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
const Template: Story<ComponentProps<typeof TableIl>> = (args) => <TableIl {...args} />;


export const FirstStory = Template.bind({});

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

FirstStory.args = {
  columnNames,
  rowData,
  getSortableRowValues
};

