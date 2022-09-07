import * as React from 'react';
import { Flex, PageSection, Title } from '@patternfly/react-core';
import { GridItem } from '@app/components/GridItem';
import { PANTS_BASE64, INDIDE_LOGO_GRID_ITEM_BASE64, SKATE_BASE64 } from 'src/mockData';
import { getProducts } from '@app/services/Products';
import { GridItemModel } from '@app/model/GridItemModel';
import { ProductCategory } from '@app/model/Product';
import { useEffect, useState } from 'react';


// MOCKS
const generateMockItems = (size: number) => {

  const array: GridItemModel[] = [];
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

const fillGridMock = (items: GridItemModel[]) => {
  return items.map(({ name, photo, price }: GridItemModel) =>
    <GridItem name={name} photo={photo} price={price} />
  );
}

// END MOCKS

interface props {
  category?: ProductCategory,
}

export const GridItems = (props: props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<GridItemModel[]>();

  const reloadProducts = async () => {
    const content = await getProducts(props.category);
    setItems(content);
    setLoading(false);
  };

  const fillGrid = () => {
    return items!.map((item) =>
      <GridItem name={item.name} photo={PANTS_BASE64} price={item.price} /> // fixme photo missing
    );
  }

  useEffect(() => {
    reloadProducts();
  }, []);

  useEffect(() => {
  }, [loading]);
  
  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">Lista de Produtos</Title>
        <Flex>
          { !loading ? fillGrid() : fillGridMock(generateMockItems(20)) }
        </Flex>
      </PageSection>
    </>
  )
};