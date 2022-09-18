
import { TshirtColour, EditProduct, EditProductTshirt, ProductCategory, ProductStatus, Size, Stock } from '@app/model/Product';
import { LocationWithoutStock } from '@app/model/SellLocation';
import { getLocations } from '@app/services/Locations';
import { createProduct, getProductByIdProtected, updateProduct } from '@app/services/Products';
import { centsToCurrency, convertToCentsForAPI, getIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, FormHelperText, PageSection, TextInput, ValidatedOptions } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from '../common/ErrorFetchingData';
import { ImageUpload } from '../common/ImageUpload';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { DropDown } from '../tables/DropDown';
import { TableProductStockByLocation } from '../tables/TableProductStockByLocation';
import tablePaddingStyles from '../ProductTable.module.css';



export const TshirtProductForm: React.FC = () => {

  const history = useHistory();
  const location = useLocation();

  const [isCreating, setIsCreating] = useState<boolean>((getIdFromPath(location.pathname) == 'create'));

  const [loading, setLoading] = useState<boolean>(!isCreating);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formValid, setIsFormValid] = useState<boolean>(true);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);



  const [itemEditing, setItemEditing] = useState<EditProductTshirt>({
    productId: "",
    name: "",
    description: "",
    image: undefined,
    price: 1,
    colour: TshirtColour.red,
    size: Size.s,
    design: "",
    status: ProductStatus.NO_INFO,
    category: ProductCategory.T_SHIRT,
    stock: [],
    totalStock: 0,
  });

  const validateForm = () =>
    itemEditing.name && itemEditing.name.length > 0 &&
    itemEditing.description && itemEditing.description.length > 0 &&
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
  const changeColour = colour => {
    setItemEditing({ ...itemEditing, colour });
  };
  const changeSize = size => {
    setItemEditing({ ...itemEditing, size });
  };
  const changeDesign = design => {
    setItemEditing({ ...itemEditing, design });
  };

  const updateImage = image => {
    setItemEditing({ ...itemEditing, image });
  };

  /*   const isCreating = getIdFromPath(location.pathname) == 'create';
   */
  const submitForm = e => {
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
    const productData: EditProductTshirt = await getProductByIdProtected(getIdFromPath(location.pathname));
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
  }, [loading, hasError, itemEditing]);


  const mapStockWithProductID = () => {
    const result = itemEditing.stock.map(stock => {
      return { ...stock, productId: itemEditing.productId }
    });
    return result;
  }

  const mapColourEnumValuesToDropDown = () =>
    Object.values(TshirtColour).map(value => { return { value }; })

  const mapSizeEnumValuesToDropDown = () =>
    Object.values(Size).map(value => { return { value }; })

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
        <PageSection>
          <Form onSubmit={e => { e.preventDefault(); }}>
          <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
              <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
            </ActionGroup>
          </Form>
          {
            isCreating ? undefined :
              <ImageUpload fileName='' data={itemEditing.image} productId={itemEditing.productId} updateItemEditing={updateImage} />
          }
          <Form onSubmit={e => { e.preventDefault(); }}>
            <FormHelperText isError={!formValid} isHidden={formValid} icon={<ExclamationCircleIcon />}>
              {"All fields must be filled in"}
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
            <FormGroup label="Colour" isRequired fieldId="simple-form-color-01">
              <DropDown disabled={!isCreating} startingValue={itemEditing.colour} values={mapColourEnumValuesToDropDown()} getDropdownValue={changeColour} />
            </FormGroup>
            <FormGroup label="Size" isRequired fieldId="simple-form-size-01">
              <DropDown disabled={!isCreating} startingValue={itemEditing.size} values={mapSizeEnumValuesToDropDown()} getDropdownValue={changeSize} />
            </FormGroup>
            <FormGroup label="Design" isRequired fieldId="simple-form-design-01">
              <TextInput
                isRequired
                isDisabled={!isCreating}
                type="text"
                id="simple-form-design-01"
                name="simple-form-design-01"
                value={itemEditing.design}
                onChange={changeDesign}
              />
            </FormGroup>
            <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
              <Button variant="primary" onClick={submitForm}>Submit</Button>
            </ActionGroup>
          </Form>
          {
            isCreating ? undefined : <TableProductStockByLocation stocks={mapStockWithProductID()} />
          }
        </PageSection>
      );
    }
  }
  return drawForm();
}
