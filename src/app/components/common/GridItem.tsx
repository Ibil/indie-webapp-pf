import * as React from 'react';
import { Button, FlexItem } from '@patternfly/react-core';
import { useHistory, useLocation } from 'react-router-dom';
import gridItemStyle from './GridItem.module.css';
import imageStyles from './ImageUpload.module.css';
import { GridItemModel } from '@app/model/GridItemModel';
import { getLastPathString } from '@app/utils/utils';


export const GridItem: React.FC<GridItemModel> = ({ productId, name, photo, price }: GridItemModel) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <FlexItem className={gridItemStyle.align}>
      <a onClick={() => history.push(`${getLastPathString(location.pathname)}/${productId}`)}>
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

