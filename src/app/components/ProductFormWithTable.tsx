
import { EditProduct, ProductCategory, ProductStatus } from '@app/model/Product';
import { SellLocation } from '@app/model/SellLocation';
import { createLocation, getLocationByID } from '@app/services/Locations';
import { getProductByIdProtected } from '@app/services/Products';
import { getIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';
import { DropDown } from './tables/DropDown';
import { TableProductStockByLocation } from './tables/TableProductStockByLocation';



export const ProductFormWithTable: React.FC = () => {

  const history = useHistory();

  /*   const [isCreating, setIsCreating] = useState<boolean>(creating == true); */

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const location = useLocation();

  const [itemEditing, setItemEditing] = useState<EditProduct>({
    productId: "",
    name: "",
    description: "",
    price: 0,
    status: ProductStatus.NO_INFO,
    category: ProductCategory.T_SHIRT,
    tags: "",
    stock: [],
    totalStock: 0
  });

  const handledressChange = address => {
    setItemEditing({ ...itemEditing, address });
  };

  // TODO concat stock locations with all locations

  const isCreating = getIdFromPath(location.pathname) == 'create';

  const submitForm = e => {
    e.preventDefault();
    setLoading(true)
    if (isCreating) {
      /*      createLocation(itemEditing)
            .then(() => {
              setHasError(false);
              setLoading(false);
            })
            .catch(() => {
              setHasError(true);
              setLoading(false)
            }) */
    }
    /*   else{   TODO this will be another button
        editLocation(itemEditing)
        .then(() => {
          setHasError(false);
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        })
      } */
  }

  useEffect(() => {
    if (!isCreating) {
      getProductByIdProtected(getIdFromPath(location.pathname))
        .then(data => {
          console.log("data");
          console.log(data);
          setItemEditing(data);
          setLoading(false);
          console.log("stock");
          console.log(itemEditing.stock);
          // TODO get products and merge all with stock
        })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        });
    }
  }, []);

  useEffect(() => {
    console.log("useEffect empty");
    console.log(itemEditing.stock);
  }, [loading, hasError, itemEditing]);

  
  const mapStockWithProductID = () =>
    itemEditing.stock.map(stock => {
      return { ...stock, productId: itemEditing.productId }
    });



  const drawForm = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData />
    }
    else {
      return (
        <>
          <Form>
            <FormGroup label="name" isRequired fieldId="simple-form-name-01">
              <TextInput
                isRequired
                type="text"
                id="simple-form-name-01"
                name="simple-form-name-01"
                value={itemEditing.name}
                onChange={handledressChange}
              />
            </FormGroup>
            <FormGroup label="name" isRequired fieldId="simple-form-name-01">
              <TextInput
                isRequired
                type="text"
                id="simple-form-name-01"
                name="simple-form-name-01"
                value={itemEditing.name}
                onChange={handledressChange}
              />
            </FormGroup>
            <ActionGroup>
              <Button variant="primary" onClick={submitForm}>Submit</Button>
              <Button variant="link" onClick={() => history.goBack()} >Go back</Button>
            </ActionGroup>
          </Form>
          <TableProductStockByLocation stocks={mapStockWithProductID()} />
        </>
      );
    }
  }

  return drawForm();
}
