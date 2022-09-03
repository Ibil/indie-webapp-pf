import * as React from 'react';
import { Button, FlexItem } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';
import gridItemStyle from './GridItem.module.css';
import imageStyles from './ImageUpload.module.css';



export interface Product {
  name: string;
  photo: string;
  price: string
}

export const GridItem: React.FC<Product> = ({ name, photo, price }: Product) => {
  const history = useHistory();
  return (
    <FlexItem className={gridItemStyle.align}>
      <a onClick={() => history.push(`editProduct/${name}`)}>
        <p>{name}</p>
        <img className={imageStyles.thumbnailGrid} src={photo} alt="Product"/>
        <p>{price}</p>
      </a>
      <Button variant="primary" onClick={() => alert("ola")}>Adicionar</Button>
    </FlexItem >
  )
};
function getMyPageRoute(name: string): string {
  return "editProduct";
}

