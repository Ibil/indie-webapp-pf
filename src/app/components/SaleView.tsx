import { ActionGroup, Button, Form, FormGroup, PageSection, TextInput } from '@patternfly/react-core';
import * as React from 'react';

import '@app/app.css';
import { Product } from '@app/model/Product';
import { Sale } from '@app/model/Sale';
import { SellLocation } from '@app/model/SellLocation';
import { User, UserRole } from '@app/model/User';
import { getLocations } from '@app/services/Locations';
import { getProducts } from '@app/services/Products';
import { getSaleById } from '@app/services/Sales';
import { getUsers } from '@app/services/Users';
import { centsToCurrency, getLastPathString } from '@app/utils/utils';
import '@patternfly/react-core/dist/styles/base.css';
import { Td, Th, Tr } from '@patternfly/react-table';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';
import { TableIlx } from './common/TableIlx';

import tablePaddingStyles from './ProductTable.module.css';
import { useAuth } from '@app/hooks/useAuth';

const columnNames = {
  productName: 'Product Name',
  quantity: "Quantity",
  price: "Price",
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (item: any): (any)[] =>
  [item.productName, item.quantity, item.price];


export const buildTableHeaders = () =>
  <Tr>
    <Th modifier="wrap" >{columnNames.productName}</Th>
    <Th modifier="wrap" >{columnNames.quantity}</Th>
    <Th modifier="wrap" >{columnNames.price}</Th>
  </Tr>;

export const buildTableBody = (data, rowIndex, history) =>
  <Tr key={rowIndex}>
    <Td dataLabel={columnNames.productName}>{data.productName}</Td>
    <Td dataLabel={columnNames.quantity}>{data.quantity}</Td>
    <Td dataLabel={columnNames.price}>{`${centsToCurrency(data.price)} €`}</Td>
  </Tr>;

export const SaleView: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [itemEditing, setItemEditing] = useState<any>({});

  const drawMetadata = () => {
    return <>
      <Form onSubmit={e => { e.preventDefault(); }}>
        <FormGroup label="Location" fieldId="simple-form-Location-01">
          <TextInput
            isRequired
            isDisabled={true}
            type="text"
            id="simple-form-Location-01"
            name="simple-form-Location-01"
            value={itemEditing.sellLocation}
          />
        </FormGroup>
        <FormGroup label="Date" fieldId="simple-form-createdAt-01">
          <TextInput
            isRequired
            isDisabled={true}
            type="text"
            id="simple-form-createdAt-01"
            name="simple-form-createdAt-01"
            value={itemEditing.createdAt}
          />
        </FormGroup>
        <FormGroup label="Total" fieldId="simple-form-Total-01">
          <TextInput
            isRequired
            isDisabled={true}
            type="text"
            id="simple-form-Total-01"
            name="simple-form-Total-01"
            value={`${centsToCurrency(itemEditing.totalPrice)}€`}
          />
        </FormGroup>
        <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
          <Button variant="tertiary" onClick={() => history.push(`/printSale`, { ...itemEditing })}>print to pdf</Button>
        </ActionGroup>
      </Form>
    </>
  }

  const drawItems = () => <TableIlx
    getSortableRowValues={getSortableRowValues}
    buildTableHeaders={buildTableHeaders}
    buildTableBody={buildTableBody}
    getItems={() => Promise.resolve(itemEditing.items)}
  />;
  const drawData = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData />
    }
    else {
      return <PageSection>
        <Form onSubmit={e => { e.preventDefault(); }}>
          <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
            <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
          </ActionGroup>
        </Form>
        {drawMetadata()}
        {drawItems()}
      </PageSection>
    }
  }

  const getSaleSellerPromise = (): Promise<User[]> => {
    return auth.role != UserRole.seller ? getUsers() : Promise.resolve([]);
  }

  const getCustomedSale = (): Promise<any> => {
    return Promise.all(
      [
        getSaleById(getLastPathString(location.pathname)),
        getSaleSellerPromise(),
        getLocations(),
        getProducts()
      ]
    ).then(zip => {
      const sale: Sale = zip[0];
      const users: User[] = zip[1];
      const locations: SellLocation[] = zip[2]
      const products: Product[] = zip[3]

      const mappedSaleItems = sale.items.map(saleProduct => {
        return {
          ...saleProduct,
          productName: products.find(product => product.productId == saleProduct.productId)!.name
        }
      })
      return {
        ...sale,
        items: mappedSaleItems,
        sellerName: auth.role != UserRole.seller ?
          users.find(user => user.userId == sale.sellerId)?.name :
          auth.username,
        sellLocation: locations.find(loc => loc.locationId == sale.locationId)?.address
      }
    });
  }

  useEffect(() => {
    getCustomedSale()
      .then(sale => {
        setItemEditing(sale);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false)
      });
  }, []);


  return <>
    {drawData()}
  </>;
};