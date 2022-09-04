import * as React from 'react';
import { Button, Flex, FlexItem, PageSection, Title } from '@patternfly/react-core';
import { Product, GridItem } from '@app/components/GridItem';
import { PANTS_BASE64, INDIDE_LOGO_GRID_ITEM_BASE64, SKATE_BASE64 } from 'src/mockData';
import saleListStyles from './SaleView.module.css';

import '@patternfly/react-core/dist/styles/base.css';
import '@app/app.css';


const generateMockItems = (size: number) => {
  const array: Product[] = [];
  while (size-- > 0) {
    const imageIndex = size % 3;
    array.push({
      name: `product #${size}`,
      photo: imageIndex == 0 ? PANTS_BASE64 : imageIndex == 1 ? INDIDE_LOGO_GRID_ITEM_BASE64 : SKATE_BASE64,
      price: '35€'
    });
  }
  return array;
}

const fillGrid = (items: Product[]) => {
  return items.map(({ name, photo, price }: Product) =>
    <GridItem name={name} photo={photo} price={price} />
  );
}

interface props {
  products: Product[],
}

export const SaleList = (props) =>
  <>
    Total : 150€  <Button variant="tertiary" onClick={() => alert("print pdf")}>print to pdf</Button>
    <Flex className={saleListStyles.itemalign} direction={{ default: 'column', lg: 'row' }}>
      <FlexItem><img className={saleListStyles.thumbnail} src={INDIDE_LOGO_GRID_ITEM_BASE64} alt="Product" /></FlexItem>
      <FlexItem> product x</FlexItem>
      <FlexItem>
        <Button variant="secondary" onClick={() => alert("-")}>-</Button>
         15 
        <Button variant="secondary" onClick={() => alert("+")}>+</Button>
        <Button variant="danger" onClick={() => alert("x")}>x</Button>
      </FlexItem>
    </Flex>
    <Flex className={saleListStyles.itemalign} direction={{ default: 'column', lg: 'row' }}>
      <FlexItem><img className={saleListStyles.thumbnail} src={INDIDE_LOGO_GRID_ITEM_BASE64} alt="Product" /></FlexItem>
      <FlexItem> product x</FlexItem>
      <FlexItem> qty remove add decrease</FlexItem>
    </Flex>
    <Flex className={saleListStyles.itemalign} direction={{ default: 'column', lg: 'row' }}>
      <FlexItem><img className={saleListStyles.thumbnail} src={INDIDE_LOGO_GRID_ITEM_BASE64} alt="Product" /></FlexItem>
      <FlexItem> product x</FlexItem>
      <FlexItem> qty remove add decrease</FlexItem>
    </Flex>
    
  </>;