import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import { ProductForm } from '@app/components/ProductForm';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/ProductForm',
  component: ProductForm,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ProductForm>> = (args) => <ProductForm {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  value1: `name x`,
  value2: 'ola@gmail.com',
  value3: ''
};

