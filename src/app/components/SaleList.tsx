import { Button, Flex, FlexItem } from '@patternfly/react-core';
import * as React from 'react';
import { INDIDE_LOGO_GRID_ITEM_BASE64 } from 'src/mockData';
import saleListStyles from './SaleView.module.css';

import '@app/app.css';
import '@patternfly/react-core/dist/styles/base.css';
import { useHistory } from 'react-router-dom';

export const SaleList: React.FC = () => {
  const history = useHistory();
  return <>
    Total : 150€  <Button variant="tertiary" onClick={() => history.push(`/printSale`)}>print to pdf</Button>
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
};