import * as React from 'react';
import { Flex, PageSection, Title } from '@patternfly/react-core';
import { GridItem } from '@app/components/common/GridItem';
import { ErrorFetchingData } from '@app/components/common/ErrorFetchingData';
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
  const [hasError, setHasError] = useState<boolean>(false);
  const [items, setItems] = useState<GridItemModel[]>();

  const reloadProducts = async () => { // remove await ! and result saved
    getProducts(props.category).then(items => {
      setItems(items);
      setLoading(false);
    })
    .catch( () => {
      setHasError(true);
      setLoading(false)
    });
  };

  const fillGrid = () => {
    if(items !== undefined) {
      return items.map((item) =>
      <GridItem productId={item.productId} name={item.name} photo={PANTS_BASE64} price={item.price} /> // fixme photo missing
    )}
    else{
       return <ErrorFetchingData/>;
    }
  }

  const drawGrid = () => {
    if(loading){
      return  <LoadingSpinner />;
    }
    else if(hasError){
      return <ErrorFetchingData/>
    }
    else{
      return fillGrid();
    }
  }

  useEffect(() => {
    reloadProducts();
  }, []);

  useEffect(() => {
  }, [loading, hasError]);
  
  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">Products</Title>
        <Flex>
          { drawGrid() }
        </Flex>
      </PageSection>
    </>
  )
};