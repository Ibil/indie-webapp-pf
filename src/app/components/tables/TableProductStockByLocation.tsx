import { Stock } from "@app/model/Product";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    locationId: 'Location Id',
    quantity: 'Quantity',
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (product: Stock): (any)[] =>
    [product.locationId,product.quantity];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.locationId}</Th>
        <Th modifier="wrap" >{columnNames.quantity}</Th>
        {/* <Th modifier="wrap">{"Actions"}</Th> */}
    </Tr>;



export const buildTableBody = (data, rowIndex, history) => {
    return <Tr key={rowIndex}>
        <Td dataLabel={columnNames.locationId}>{data.locationId}</Td>
        <Td dataLabel={columnNames.quantity}>{data.quantity}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`/listProducts/${data.productId}/${data.locationId}`, { quantity: data.quantity })}>Edit Stock</Button>
            </TableText>
        </Td> 
    </Tr>
};

export interface StocksData {
    stocks: Stock[];
}

export const TableProductStockByLocation: React.FunctionComponent <StocksData> = ({stocks}: StocksData) => {

    const getStocks = () => Promise.resolve(stocks);

    return <>
    <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getStocks}
    />
    </>
}