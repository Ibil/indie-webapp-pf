import * as React from 'react';
import { Button, FlexItem } from '@patternfly/react-core';


export interface Product {
  name: string;
  photo: string;
  price: string
}

export const GridItem = ({ name, photo, price }: Product) => (
  <FlexItem>
    <p>{name}</p>
    <img src={photo} alt="Product" />
    <p>{price}</p>
    <Button variant="primary">Adicionar</Button>
  </FlexItem>
);
