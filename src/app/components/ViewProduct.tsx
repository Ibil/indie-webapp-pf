import { useAuth } from '@app/hooks/useAuth';
import { EditProduct, ProductStatus } from '@app/model/Product';
import { LocationWithoutStock } from '@app/model/SellLocation';
import { UserRole } from '@app/model/User';
import { getLocations } from '@app/services/Locations';
import { getProductById, getProductByIdProtected } from '@app/services/Products';
import { centsToCurrency, getIdFromPath, removeIdFromPathForGrid } from '@app/utils/utils';
import { ActionGroup, Button, DescriptionList, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm, Flex, FlexItem, Form, FormGroup, FormHelperText, PageSection, TextInput } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { SKATE_BASE64 } from 'src/mockData';
import { LoadingSpinner } from './common/LoadingSpinner';
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

  const [cartLocation, setCartLocation] = useState<string>(""); // auth?.cart?.locationId
  const [cartLocationName, setCartLocationName] = useState<string>(); // auth?.cart?.locationName
  const [buyQuantity, setBuyQuantity] = useState<string>("1");

  const [sellLocations, setSellLocations] = useState<LocationWithoutStock[]>([]);


  const loadData = async () => {
    let data;
    if (auth.role == undefined || auth.role == UserRole.basic) {
      data = await getProductById(getIdFromPath(location.pathname));
    }
    else {
      const sellLocationsResponseData = await getLocations();
      setSellLocations(sellLocationsResponseData);
      data = await getProductByIdProtected(getIdFromPath(location.pathname));
    }
    setItemEditing(data);
    return undefined;
  }

  useEffect(() => {
    loadData()
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  }, [loading, hasError, itemEditing]);

  const mapEnumValuesToDropDown = () => {
    const res = itemEditing.stock.filter(stock =>
      stock.quantity > 0 && (
        auth?.cart?.locationId == undefined || auth?.cart?.locationId == stock.locationId
      ))
      .map(stock => {
        const locationWithAdress = sellLocations.find(location => location.locationId == stock.locationId);
        return { value: stock.locationId, label: locationWithAdress?.address, description: `${stock.quantity} units remaining` };
      });
    return res;
  }
  const getDropdownValue = (loc) => {
    console.log("getDropdownValue - location");
    console.log(loc);
    setCartLocation(loc);
    const locationWithAdress = sellLocations.find(location => location.locationId == loc);
    setCartLocationName(locationWithAdress!.address);
  };

  const handleBuyQuantityChange = (qty) =>
    setBuyQuantity(qty);

  const isCartCreated = (context) => {
    return context?.cart?.list?.length > 0;
  }

  const addToCart = () => {
    console.log("addToCart - cartLocation");
    console.log(cartLocation);
    if (cartLocation == undefined || cartLocation.length == 0 || parseInt(buyQuantity) <= 0) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    setLoading(true);

    if (!isCartCreated(auth)) {
      setAuth({
        ...auth, cart: {
          locationId: cartLocation,
          locationName: cartLocationName,
          list: [{
            productId: itemEditing.productId,
            productName: itemEditing.name,
            price: itemEditing.price,
            quantity: parseInt(buyQuantity)
          }]
        }
      });
    }
    else {
      const productIndex = auth.cart.list.findIndex(productQuantity => {
        return productQuantity.productId == itemEditing.productId
      });

      const listCopy = [...(auth.cart.list)];

      if (productIndex >= 0) {
        listCopy[productIndex] = {
          productId: itemEditing.productId,
          productName: itemEditing.name,
          price: itemEditing.price,
          quantity: parseInt(buyQuantity) + parseInt(listCopy[productIndex].quantity)
        }
      }
      else {
        listCopy.push({
          productId: itemEditing.productId,
          productName: itemEditing.name,
          price: itemEditing.price,
          quantity: parseInt(buyQuantity)
        })
      }
      const newAuth = {
        role: auth.role,
        username: auth.username,
        cart: {
          locationId: cartLocation,
          locationName: cartLocationName,
          list: listCopy
        }
      };
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
          <Button variant="primary" onClick={addToCart}>Add products</Button>
        </FormGroup>
      </Form >
    }
  }

  const generateTags = () => {
    console.log("tags");
    console.log(itemEditing.tags);
    const tags: any[] = [];
    if (itemEditing.tags != undefined) {

      return Object.entries(itemEditing.tags).map(([k, v]) =>{
        return <DescriptionListGroup>
        <DescriptionListTerm>{k}</DescriptionListTerm>
        <DescriptionListDescription>
          {v}
        </DescriptionListDescription>
      </DescriptionListGroup>
      } );

/*       for (const property in itemEditing.tags) {
        console.log(`${property}: ${itemEditing.tags[property]}`);
        tags.push(<DescriptionListGroup>
          <DescriptionListTerm>{property}</DescriptionListTerm>
          <DescriptionListDescription>
            {itemEditing.tags[property]}
          </DescriptionListDescription>
        </DescriptionListGroup>)
      } */
    }
    else{
      return undefined;
    }
  }

  const drawViewArea = () => {

    return <FlexItem className={gridItemStyle.align}>
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
        {generateTags()}
      </DescriptionList>
    </FlexItem >;
  }

  return (
    <PageSection>
      {hasSubmitted ? <Redirect to={removeIdFromPathForGrid(location.pathname)} /> : undefined}
      <ActionGroup>
        <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
      </ActionGroup>
      {loading ?
        <LoadingSpinner /> :
        <Flex>
          <FlexItem className={gridItemStyle.align}>
            {<img className={imageStyles.thumbnailGrid} src={itemEditing.image ?? SKATE_BASE64} alt="Product" />}
          </FlexItem >
          {drawViewArea()}
          <FlexItem className={gridItemStyle.align}>
            {drawBuyArea()}
          </FlexItem>
        </Flex>
      }
    </PageSection>
  );
}
