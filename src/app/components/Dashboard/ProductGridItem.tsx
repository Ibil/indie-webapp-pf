import * as React from 'react';
import { Button, Flex, FlexItem, PageSection, Title } from '@patternfly/react-core';

export interface Product {
  name: string;
  photo: string;
  price: string
}

const ProductGridItem = ({name, photo, price}: Product) => (  
      <FlexItem>
        <p>{name}</p><p>{photo}</p><p>{price}</p><Button variant="primary">Add</Button>
      </FlexItem>
);  
  

export { ProductGridItem };