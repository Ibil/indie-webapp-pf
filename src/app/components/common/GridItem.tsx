import { GridItemModel } from '@app/model/GridItemModel';
import { centsToCurrency, getPushPathForGrid } from '@app/utils/utils';
import { FlexItem } from '@patternfly/react-core';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import gridItemStyle from './GridItem.module.css';
import imageStyles from './ImageUpload.module.css';


export const GridItem: React.FC<GridItemModel> = ({ productId, name, photo, price }: GridItemModel) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <FlexItem className={gridItemStyle.align}>
      <a onClick={() => history.push(`${getPushPathForGrid(location.pathname)}/${productId}`)}>
        <p>{name}</p>
        <img className={imageStyles.thumbnailGrid} src={photo} alt="Product"/>
        <p>{`${centsToCurrency(price)} €`}</p>
      </a>
   {/*    <Button variant="primary" onClick={() => alert("ola")}>Adicionar</Button> */}
    </FlexItem >
  )
};
