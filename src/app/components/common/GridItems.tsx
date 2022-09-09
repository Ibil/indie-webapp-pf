import * as React from 'react';
import { Flex, PageSection, Title } from '@patternfly/react-core';
import { GridItem } from '@app/components/common/GridItem';
import { PANTS_BASE64, INDIDE_LOGO_GRID_ITEM_BASE64, SKATE_BASE64 } from 'src/mockData';
import { getProducts } from '@app/services/Products';
import { GridItemModel } from '@app/model/GridItemModel';
import { ProductCategory } from '@app/model/Product';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';


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
        <Title headingLevel="h1" size="lg">Products</Title>
        <Flex>
          { !loading ? fillGrid() : <LoadingSpinner /> }
        </Flex>
      </PageSection>
    </>
  )
};