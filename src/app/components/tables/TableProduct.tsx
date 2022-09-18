import { Product } from "@app/model/Product";
import { getProducts } from "@app/services/Products";
import { ActionGroup, Button, Form, PageSection } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { useHistory } from "react-router-dom";
import { TableIlx } from "../common/TableIlx";

import tablePaddingStyles from '../ProductTable.module.css';


const columnNames = {
    name: 'Product Name',
    category: 'Category',
    status: 'Status',
    price: 'Price',
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (editProducts: Product): (any)[] =>
    [editProducts.name, editProducts.category, editProducts.status, editProducts.price];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.name}</Th>
        <Th modifier="wrap" >{columnNames.category}</Th>
        <Th modifier="wrap" >{columnNames.status}</Th>
        <Th modifier="wrap" >{columnNames.price}</Th>
        <Th modifier="wrap">{"Actions"}</Th>
    </Tr>;


export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.name}>{data.name}</Td>
        <Td dataLabel={columnNames.category}>{data.category}</Td>
        <Td dataLabel={columnNames.status}>{data.status}</Td>
        <Td dataLabel={columnNames.price}>{(data.price) / 100}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`/listProducts/${data.category}/${data.productId}`)}>edit</Button>
            </TableText>
        </Td>
    </Tr>;

export const TableProduct: React.FunctionComponent = () => {
    const history = useHistory();
    return <PageSection>
        <Form onSubmit={e => { e.preventDefault(); }}>
            <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
                <Button variant="secondary" onClick={() => history.goBack()} >Go back</Button>
                <Button variant="primary" onClick={() => history.push(`/listProducts/tshirt/create`)}>Create T-Shirt</Button>
                <Button variant="primary" onClick={() => history.push(`/listProducts/bag/create`)}>Create Bag</Button>
                <Button variant="primary" onClick={() => history.push(`/listProducts/book/create`)}>Create Book</Button>
            </ActionGroup>
        </Form>
        <TableIlx 
            getSortableRowValues={getSortableRowValues}
            buildTableHeaders={buildTableHeaders}
            buildTableBody={buildTableBody}
            getItems={getProducts}
        />
    </PageSection>;
}
