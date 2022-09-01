import * as React from 'react';
import { Flex, PageSection, Title } from '@patternfly/react-core';
import { Product, GridItem } from '@app/components/GridItem';
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';

const generateMockItems = (size: number) => {
  const array: Product[] = [];
  while (size-- > 0) {
    array.push({
      name: `product #${size}`,
      photo: INDIDE_LOGO_GRID_ITEM_BASE64,
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

interface props{
  products: Product[], 
}

export const GridItems = (props) => (
  <>
  <PageSection>
    <Title headingLevel="h1" size="lg">Lista de Produtos</Title>
    <Flex>
      {fillGrid(props.products ?? generateMockItems(20))}
    </Flex>
  </PageSection>
  </>
);