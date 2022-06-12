import * as React from 'react';
import { Button, Flex, FlexItem, PageSection, Title } from '@patternfly/react-core';


export interface Product {
  name: string;
  photo: string;
  price: string
}

export const ProductGridItem = ({ name, photo, price }: Product) => (
  <FlexItem>
    <p>{name}</p>
    <img src={photo} alt="Product" />
    <p>{price}</p>
    <Button variant="primary">Add</Button>
  </FlexItem>
);
