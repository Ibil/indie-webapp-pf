import * as React from 'react';
import { Flex, FlexItem, PageSection, Title } from '@patternfly/react-core';
import { Product, ProductGridItem } from '@app/components/Dashboard/ProductGridItem';

const generateMockItems = (size: number) => {
  const array: Product[] = [];
  while( size-- > 0){
    array.push({
      name: `product #${size}`,
      photo: 'abc',
      price: '35€'
    });
  }
  return array;
}

const fillGrid = (items: Product[]) => {
  return items.map(({name, photo, price}: Product) => 
    <ProductGridItem name={name} photo={photo} price={price}/>
  );
}

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">Lista de Produtos</Title>
    <Flex>
      {fillGrid(generateMockItems(20))}
    </Flex>
  </PageSection>
)


export { Dashboard };
