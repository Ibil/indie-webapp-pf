
import { EditProduct, ProductCategory, ProductStatus, Stock } from '@app/model/Product';
import { LocationWithoutStock } from '@app/model/SellLocation';
import { getLocations } from '@app/services/Locations';
import { createProduct, getProductByIdProtected, updateProduct } from '@app/services/Products';
import { getIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';
import { TableProductStockByLocation } from './tables/TableProductStockByLocation';



export const ProductFormWithTable: React.FC = () => {

  const history = useHistory();
  const location = useLocation();

  const [isCreating, setIsCreating] = useState<boolean>((getIdFromPath(location.pathname) == 'create'));

  const [loading, setLoading] = useState<boolean>(!isCreating);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);



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

  /*   const isCreating = getIdFromPath(location.pathname) == 'create';
   */
  const submitForm = e => {
    e.preventDefault();
    setLoading(true)
    if (isCreating) {
      createProduct(itemEditing)
        .then(() => {
          setHasError(false);
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        })
    }
    else {
      updateProduct(itemEditing)
        .then(() => {
          setHasError(false);
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        })
    }
  }

  const addLocationToProductStock = (productData: EditProduct, locations: LocationWithoutStock[]) => {
    console.log("stock")
    console.log(productData.stock)
    console.log("locations")
    console.log(locations)
    const stockWithAllLocations: Stock[] = locations.map(location => {
      const stockFound = productData.stock.find(stockEl => stockEl.locationId == location.locationId);

      if (stockFound) {
        return stockFound;
      }
      else {
        return {
          locationId: location.locationId,
          quantity: 0
        }
      }
    });
    setItemEditing({ ...productData, stock: stockWithAllLocations })
  }

  const getNecessaryEditData = async () => {
    const productData: EditProduct = await getProductByIdProtected(getIdFromPath(location.pathname));
    const locations = await getLocations();
    addLocationToProductStock(productData, locations);
  }

  useEffect(() => {
    if (!isCreating) {
      getNecessaryEditData()
        .then(() => {
          setLoading(false);
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


  const mapStockWithProductID = () => {
    console.log("stocks when mapping to table");
    const result = itemEditing.stock.map(stock => {
      return { ...stock, productId: itemEditing.productId }
    });
    console.log(result);
    return result;
  }

  const drawForm = () => {
    if (loading && !hasSubmitted) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData />
    }
    else if (hasSubmitted) {
      return <Redirect to={'/listProducts/'} />
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
          {
            isCreating ? undefined : <TableProductStockByLocation stocks={mapStockWithProductID()} />
          }
        </>
      );
    }
  }
  return drawForm();
}
