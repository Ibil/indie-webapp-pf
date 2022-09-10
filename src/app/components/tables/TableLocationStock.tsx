import { ProductForLocation, SellLocation } from "@app/model/SellLocation";
import { getLocationByID, getLocations } from "@app/services/Locations";
import { getIdFromPath } from "@app/utils/utils";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    name: 'Product Name',
    category: 'Category',
    price: 'Price',
    quantity: 'Quantity',
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (product: ProductForLocation): (any)[] =>
    [product.name, product.category, product.price, product.quantity];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.name}</Th>
        <Th modifier="wrap" >{columnNames.category}</Th>
        <Th modifier="wrap" >{columnNames.price}</Th>
        <Th modifier="wrap" >{columnNames.quantity}</Th>
        {/* <Th modifier="wrap">{"Actions"}</Th> */}
    </Tr>;

export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.name}>{data.name}</Td>
        <Td dataLabel={columnNames.category}>{data.category}</Td>
        <Td dataLabel={columnNames.price}>{data.price}</Td>
        <Td dataLabel={columnNames.quantity}>{data.quantity}</Td>
        {/* <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`${data.locationId}`)}>View Stock</Button>
            </TableText>
        </Td> */}
    </Tr>;

export const TableLocationStock: React.FunctionComponent = () => {

    const location = useLocation();

    return <>
    <TableIlx
        tableEntityID={getIdFromPath(location.pathname)}
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItemsWithId={getLocationByID}
    />
    </>
}