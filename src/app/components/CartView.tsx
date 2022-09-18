import { ActionGroup, Bullseye, Button, EmptyState, EmptyStateIcon, EmptyStateVariant, Form, FormGroup, PageSection, TextInput, Title } from '@patternfly/react-core';
import * as React from 'react';

import '@app/app.css';
import { useAuth } from '@app/hooks/useAuth';
import { createSale } from '@app/services/Sales';
import { centsToCurrency } from '@app/utils/utils';
import '@patternfly/react-core/dist/styles/base.css';
import { SearchIcon } from '@patternfly/react-icons';
import { Table, Td, Th, Tr } from '@patternfly/react-table';
import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';
import { TableIlx } from './common/TableIlx';

import tablePaddingStyles from './ProductTable.module.css';


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

export const CartView: React.FC = () => {
  const history = useHistory();
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const clearBasket = () => {
    const newAuth = {
      role: auth.role,
      username: auth.username,
    };
    setAuth(newAuth)
    history.push(location.pathname)
  }

  const makeSale = () => {
    setLoading(true);
    createSale(auth.cart)
      .then(() => {
        setHasError(false);
        setLoading(false);
        clearBasket();
        setHasSubmitted(true);
      })
      .catch(() => {
        setHasError(true);
        clearBasket()
        setLoading(false);
      });
  }

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
            value={auth.cart.locationName}
          />
        </FormGroup>
        <FormGroup label="Total" fieldId="simple-form-Total-01">
          <TextInput
            isRequired
            isDisabled={true}
            type="text"
            id="simple-form-Total-01"
            name="simple-form-Total-01"
            value={`${centsToCurrency(auth.cart.list.reduce((acc, current) => acc += (current.price * current.quantity), 0))}€`}
          />
        </FormGroup>
        <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
          <Button variant="danger" onClick={clearBasket}>ClearBasket</Button>
          <Button variant="primary" onClick={makeSale}>Make Sale</Button>
        </ActionGroup>
      </Form>
    </>
  }

  const getItems = (): Promise<any> => {
    return Promise.resolve(auth.cart.list);
  }

  const drawItems = () => <TableIlx
    getSortableRowValues={getSortableRowValues}
    buildTableHeaders={buildTableHeaders}
    buildTableBody={buildTableBody}
    getItems={getItems}
  />;

  /* auth.cart.list.map(product => `name ${product.productName} quantity ${product.quantity} price ${centsToCurrency(product.price)}€`); */

  const drawData = () => {
    if (loading && !hasSubmitted) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData message={"Sale could not be completed.Cart cleared. please check if product quantities have expired"} />
    }
    else if (hasSubmitted) {
      return <Redirect to={'/viewSales'} />
    }
    else if (auth.cart) {
      return <>
        {drawMetadata()}
        {drawItems()}
      </>
    }
    else {
      return <Table><Tr key={0}>
        <Td colSpan={8}>
          <Bullseye>
            <EmptyState variant={EmptyStateVariant.small}>
              <EmptyStateIcon icon={SearchIcon} />
              <Title headingLevel="h2" size="lg">
                No Data
              </Title>
            </EmptyState>
          </Bullseye>
        </Td>
      </Tr></Table>;
    }
  }




  return <PageSection>
    <Form onSubmit={e => { e.preventDefault(); }}>
      <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
        <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
      </ActionGroup>
    </Form>
    {drawData()}
  </PageSection>;
};