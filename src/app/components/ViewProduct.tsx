import { useAuth } from '@app/hooks/useAuth';
import { EditProduct, Product, ProductCategory, ProductStatus } from '@app/model/Product';
import { UserRole } from '@app/model/User';
import { getProductById, getProductByIdProtected } from '@app/services/Products';
import { createSale } from '@app/services/Sales';
import { centsToCurrency, getIdFromPath, removeIdFromPath } from '@app/utils/utils';
import { ActionGroup, Button, DescriptionList, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm, Flex, FlexItem, Form, FormGroup, FormHelperText, TextInput } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { PANTS_BASE64 } from 'src/mockData';
import { default as gridItemStyle, default as imageStyles } from './griditemview.module.css';
import { DropDown } from './tables/DropDown';



export const ViewProduct: React.FC = () => {

  const { auth, setAuth } = useAuth();

  const history = useHistory();
  const location = useLocation();

  const [formValid, setIsFormValid] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const [itemEditing, setItemEditing] = useState<EditProduct>({
    productId: "",
    name: "",
    description: "",
    price: 0,
    status: ProductStatus.NO_INFO,
    stock: [],
    totalStock: 0
  });

  const [cartLocation, setCartLocation] = useState<string>(auth?.cart?.locationId);
  const [buyQuantity, setBuyQuantity] = useState<string>("1");




  React.useEffect(() => {
    if (auth.role == UserRole.basic) {
      getProductById(getIdFromPath(location.pathname))
        .then(data => {
          setItemEditing(data);
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        });
    }
    else {
      getProductByIdProtected(getIdFromPath(location.pathname))
        .then(data => {
          setItemEditing(data);
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



  const mapEnumValuesToDropDown = () => {
    const res = itemEditing.stock.filter(stock =>
      stock.quantity > 0 && (
        cartLocation == undefined || cartLocation == stock.locationId
      ))
      .map(stock => { return { value: stock.locationId, }; }); // TODO use name instead and then map when calling getDropdownValue
    /*     console.log("mapEnumValuesToDropDown");
        console.log(res) */
    return res;
  }
  const getDropdownValue = (loc) => {
    setCartLocation(loc);
  };

  const handleBuyQuantityChange = (qty) =>
    setBuyQuantity(qty);

  const isCartCreated = (context) => {
    return context?.cart?.list?.length > 0;
  }

  const addToCart = () => {
    if (cartLocation == undefined || cartLocation.length == 0 || parseInt(buyQuantity) <= 0) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    setLoading(true);
    console.log("cart now");
    console.log(auth);

    if (!isCartCreated(auth)) {
      console.log("cart empty");
      setAuth({
        ...auth, cart: {
          locationId: cartLocation,
          list: [{
            productId: itemEditing.productId,
            quantity: parseInt(buyQuantity)
          }]
        }
      });
      console.log(auth);
    }
    else {
      console.log("cart not empty")
      const productIndex = auth.cart.list.findIndex(productQuantity => {
        return productQuantity.productId == itemEditing.productId
      });

      const listCopy = [...(auth.cart.list)];
      console.log("listCopy");
      console.log(listCopy);

      if (productIndex >= 0) {
        console.log("index=" + productIndex + " cart has product with qty" + listCopy[productIndex].quantity);
        listCopy[productIndex] = {
          productId: itemEditing.productId,
          quantity: parseInt(buyQuantity) + parseInt(listCopy[productIndex].quantity)
        }
        console.log("listCopy alterado com mais qty");
        console.log(listCopy);
      }
      else {
        console.log("cart : new product");
        listCopy.push({
          productId: itemEditing.productId,
          quantity: parseInt(buyQuantity)
        })
        console.log("listCopy alterado com mais 1 product");
        console.log(listCopy);
      }
      const newAuth = {
        role: auth.role,
        username: auth.username,
        cart: {
          locationId: cartLocation,
          list: listCopy
        }
      };

      /*     role: auth.role,
          username: auth.username,
          cart: {
            locationId: cartLocation,
            list: listCopy
          } */

      /*       ...auth, cart: {
              locationId: cartLocation,
              list: listCopy
            } */
      console.log("newAuth");
      console.log(newAuth);
      setAuth(newAuth);
    }
    setLoading(false);
    setHasSubmitted(true);
  }


  const drawBuyArea = () => {
    if (loading || auth.role == undefined || auth.role == UserRole.basic) {
      return undefined;
    }
    else {
      return <Form onSubmit={e => { e.preventDefault(); }}>
        <FormGroup>
          <DropDown values={mapEnumValuesToDropDown()} getDropdownValue={getDropdownValue} startingValue={undefined} />
        </FormGroup>
        <FormHelperText isError={!formValid} isHidden={formValid} icon={<ExclamationCircleIcon />}>
          {"Choose a location. Quantity must be greater than 0"}
        </FormHelperText>
        <FormGroup label="Quantity">
          <TextInput
            isRequired
            type="number"
            id="simple-form-qty-01"
            name="simple-form-qty-01"
            value={buyQuantity}
            onChange={handleBuyQuantityChange}
          />
        </FormGroup>
        <FormGroup>
          <Button variant="primary" onClick={addToCart}>Submit</Button>
        </FormGroup>
      </Form >
    }
  }

  return (
    <>
      {hasSubmitted ? <Redirect to={removeIdFromPath(location.pathname)} /> : undefined}
      <ActionGroup>
        <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
      </ActionGroup>
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
                {`${centsToCurrency(itemEditing.price)} € `}
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
        <FlexItem className={gridItemStyle.align}>
          {drawBuyArea()}
        </FlexItem>
      </Flex>
    </>
  );
}
