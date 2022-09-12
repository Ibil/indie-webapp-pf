import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import { ProductForm } from '@app/components/productForms/ProductForm';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/ProductForm',
  component: ProductForm,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ProductForm>> = (args) => <ProductForm {...args} />;

export const editable = Template.bind({});
editable.args = {
  name: `name x`,
  mail: 'ola@gmail.com',
  photo: '',
  isDisabled: false,
};

export const disabled = Template.bind({});
disabled.args = {
  name: `name x`,
  mail: 'ola@gmail.com',
  photo: '',
  isDisabled: true,
};