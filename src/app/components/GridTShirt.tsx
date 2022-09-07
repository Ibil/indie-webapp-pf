import { ProductCategory } from '@app/model/Product';
import * as React from 'react';
import { GridItems } from './common/GridItems';


export const GridTshirt = () => (
  <GridItems category={ProductCategory.T_SHIRT}/>
);