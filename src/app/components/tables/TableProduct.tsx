import { Product } from "@app/model/Product";
import { getProducts } from "@app/services/Products";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { useHistory } from "react-router-dom";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    name: 'Product Name',
    category: 'Category',
    status: 'Status',
    price: 'Price'
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

// see protected route for the push  onClick={() => history.push(`${data.productId}`, { creating: false })}>edit</Button>
export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.name}>{data.name}</Td>
        <Td dataLabel={columnNames.category}>{data.category}</Td>
        <Td dataLabel={columnNames.status}>{data.status}</Td>
        <Td dataLabel={columnNames.price}>{(data.price) / 100}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`/listProducts/${data.productId}`)}>edit</Button>
            </TableText>
        </Td>
    </Tr>;

export const TableProduct: React.FunctionComponent = () => {
    const history = useHistory();
    return <>
    <Button variant="primary" onClick={() => history.push(`/listProducts/create`)}>Create Product</Button>
    <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getProducts}
    />
    </>
}