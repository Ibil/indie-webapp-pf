import * as React from 'react';
import { Button, FlexItem } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';
import gridItemStyle from './GridItem.module.css';
import imageStyles from './ImageUpload.module.css';
import { GridItemModel } from '@app/model/GridItemModel';


export const GridItem: React.FC<GridItemModel> = ({ productId, name, photo, price }: GridItemModel) => {
  const history = useHistory();
  return (
    <FlexItem className={gridItemStyle.align}>
      <a onClick={() => history.push(`viewProduct/${productId}`)}>
        <p>{name}</p>
        <img className={imageStyles.thumbnailGrid} src={photo} alt="Product"/>
        <p>{price}</p>
      </a>
   {/*    <Button variant="primary" onClick={() => alert("ola")}>Adicionar</Button> */}
    </FlexItem >
  )
};
function getMyPageRoute(name: string): string {
  return "viewProduct";
}

