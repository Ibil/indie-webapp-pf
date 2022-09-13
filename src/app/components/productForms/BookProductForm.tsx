
import { EditProductBook, ProductCategory, ProductStatus, Stock } from '@app/model/Product';
import { LocationWithoutStock } from '@app/model/SellLocation';
import { getLocations } from '@app/services/Locations';
import { createProduct, getProductByIdProtected, updateProduct } from '@app/services/Products';
import { centsToCurrency, convertToCentsForAPI, getIdFromPath, validateYear } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, FormHelperText, TextInput, ValidatedOptions } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from '../common/ErrorFetchingData';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TableProductStockByLocation } from '../tables/TableProductStockByLocation';



export const BookProductForm: React.FC = () => {

  const history = useHistory();
  const location = useLocation();

  const [isCreating, setIsCreating] = useState<boolean>((getIdFromPath(location.pathname) == 'create'));

  const [loading, setLoading] = useState<boolean>(!isCreating);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formValid, setIsFormValid] = useState<boolean>(true);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);



  const [itemEditing, setItemEditing] = useState<EditProductBook>({
    productId: "",
    name: "",
    description: "",
    price: 1,
    title: "",
    author: "",
    publisher: "",
    year: "",
    status: ProductStatus.NO_INFO,
    category: ProductCategory.BOOK,
    stock: [],
    totalStock: 0
  });

  const validateForm = () =>
    itemEditing.name && itemEditing.name.length > 0 &&
    itemEditing.description && itemEditing.description.length > 0 &&
    itemEditing.title && itemEditing.title.length > 0 &&
    itemEditing.author && itemEditing.author.length > 0 &&
    itemEditing.publisher && itemEditing.publisher.length > 0 &&
    validateYear(itemEditing.year)
  itemEditing.price > 0;

  const changeName = name => {
    setItemEditing({ ...itemEditing, name });
  };
  const changeDescription = description => {
    setItemEditing({ ...itemEditing, description });
  };
  const changePrice = price => {
    setItemEditing({ ...itemEditing, price });
  };
  const changeTitle = title => {
    setItemEditing({ ...itemEditing, title });
  };
  const changeAuthor = author => {
    setItemEditing({ ...itemEditing, author });
  };
  const changePublisher = publisher => {
    setItemEditing({ ...itemEditing, publisher });
  };

  const changeYear = year => {
    setItemEditing({ ...itemEditing, year });
  };

  const submitForm = e => {
    console.log("Product data =" + itemEditing.category )
    /* e.preventDefault(); */
    if (!validateForm()) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    setLoading(true)
    if (isCreating) {
      createProduct({ ...itemEditing, price: convertToCentsForAPI(itemEditing.price) })
        .then(() => {
          setHasError(false);
          setLoading(false);
          setHasSubmitted(true);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        })
    }
    else {
      updateProduct({ ...itemEditing, price: convertToCentsForAPI(itemEditing.price) })
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

  const addLocationToProductStock = (productData, locations: LocationWithoutStock[]) => {
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
    const productData: EditProductBook = await getProductByIdProtected(getIdFromPath(location.pathname));
    productData.price = centsToCurrency(productData.price);
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
      return <>
        <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
        <ErrorFetchingData />
      </>
    }
    else if (hasSubmitted) {
      return <Redirect to={'/listProducts/'} />
    }
    else {
      return (
        <>
          <Form onSubmit={e => { e.preventDefault(); }}>
            <ActionGroup>
              <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
            </ActionGroup>
            <FormHelperText isError={!formValid} isHidden={formValid} icon={<ExclamationCircleIcon />}>
              {"All fields must be filled in. year must be between 0 and 3000"}
            </FormHelperText>
            <FormGroup label="name" isRequired
              validated={itemEditing.name && itemEditing.name.length > 0 ? ValidatedOptions.default : ValidatedOptions.error}
              fieldId="simple-form-name-01">
              <TextInput
                isRequired
                type="text"
                id="simple-form-name-01"
                name="simple-form-name-01"
                value={itemEditing.name}
                onChange={changeName}
              />
            </FormGroup>
            <FormGroup label="Description" isRequired fieldId="simple-form-description-01">
              <TextInput
                isRequired
                type="text"
                id="simple-form-description-01"
                name="simple-form-description-01"
                value={itemEditing.description}
                onChange={changeDescription}
              />
            </FormGroup>
            <FormGroup label="Price" isRequired fieldId="simple-form-price-01">
              <TextInput
                isRequired
                type="number"
                id="simple-form-price-01"
                name="simple-form-price-01"
                value={itemEditing.price}
                onChange={changePrice}
              />
            </FormGroup>
            <>
              <FormGroup label="Title" isRequired fieldId="simple-form-title-01">
                <TextInput
                  isRequired
                  isDisabled={!isCreating}
                  type="text"
                  id="simple-form-title-01"
                  name="simple-form-title-01"
                  value={itemEditing.title}
                  onChange={changeTitle}
                />
              </FormGroup>
              <FormGroup label="Author" isRequired fieldId="simple-form-author-01">
                <TextInput
                  isRequired
                  isDisabled={!isCreating}
                  type="text"
                  id="simple-form-author-01"
                  name="simple-form-author-01"
                  value={itemEditing.author}
                  onChange={changeAuthor}
                />
              </FormGroup>
              <FormGroup label="Publisher" isRequired fieldId="simple-form-publisher-01">
                <TextInput
                  isRequired
                  isDisabled={!isCreating}
                  type="text"
                  id="simple-form-publisher-01"
                  name="simple-form-publisher-01"
                  value={itemEditing.publisher}
                  onChange={changePublisher}
                />
              </FormGroup>
              <FormGroup label="Year" isRequired fieldId="simple-form-year-01">
                <TextInput
                  isRequired
                  isDisabled={!isCreating}
                  type="text"
                  id="simple-form-year-01"
                  name="simple-form-year-01"
                  value={itemEditing.year}
                  onChange={changeYear}
                />
              </FormGroup>
            </>
            <ActionGroup>
              <Button variant="primary" onClick={submitForm}>Submit</Button>
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
