import { Product, ProductCategory, ProductStatus } from '@app/model/Product';
import { getProductById } from '@app/services/Products';
import { getIdFromPath } from '@app/utils/utils';
import { DescriptionList, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm, Flex, FlexItem } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PANTS_BASE64 } from 'src/mockData';
import { default as gridItemStyle, default as imageStyles } from './griditemview.module.css';



export const ViewProduct: React.FC = () => {

  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [itemEditing, setItemEditing] = useState<Product>({
    productId: "",
    name: "",
    description: "",
    price: 0,
    status: ProductStatus.NO_INFO,
    category: ProductCategory.T_SHIRT,
    tags: ""
  });

  React.useEffect(() => {
    getProductById(getIdFromPath(location.pathname))
      .then(data => {
        setItemEditing(data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false)
      });
  }, []);

  useEffect(() => {
  }, [loading, hasError, itemEditing]);

  return (
    <>
      <Flex>
        <FlexItem className={gridItemStyle.align}>
          {<img className={imageStyles.thumbnailGrid} src={PANTS_BASE64} alt="Product" />}
        </FlexItem >
        <FlexItem className={gridItemStyle.align}>
          <DescriptionList columnModifier={{
            default: '2Col'
          }}>
            <DescriptionListGroup>
              <DescriptionListTerm>Name</DescriptionListTerm>
              <DescriptionListDescription>
                {itemEditing.name}
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Description</DescriptionListTerm>
              <DescriptionListDescription>
                {itemEditing.description}
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Price</DescriptionListTerm>
              <DescriptionListDescription>
                {`${(itemEditing.price) / 100} € `}
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Availability</DescriptionListTerm>
              <DescriptionListDescription>
                {itemEditing.status}
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </FlexItem >
   {/*      <FlexItem className={gridItemStyle.align}>
          <Button variant="primary" onClick={() => alert("ola")}>Buy at Cinema</Button>
          <hr></hr>
          <Button variant="primary" onClick={() => alert("ola")}>Buy at Expo</Button>
        </FlexItem> */}
      </Flex>
    </>
  );
}
