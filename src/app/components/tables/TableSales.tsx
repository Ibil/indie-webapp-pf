import { Sale } from "@app/model/Sale";
import { getSales } from "@app/services/Sales";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    saleId: 'Sale ID',
    customerId: "Customer",
    sellerId: "Seller",
    locationId: "Location",
    status: "Sale Status",
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (location: Sale): (any)[] =>
    [location.saleId, location.customerId, location.sellerId, location.locationId, location.status];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.saleId}</Th>
        <Th modifier="wrap" >{columnNames.customerId}</Th>
        <Th modifier="wrap" >{columnNames.sellerId}</Th>
        <Th modifier="wrap" >{columnNames.locationId}</Th>
        <Th modifier="wrap" >{columnNames.status}</Th>
        <Th modifier="wrap">{"Actions"}</Th>
    </Tr>;

export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.saleId}>{data.saleId}</Td>
        <Td dataLabel={columnNames.customerId}>{data.customerId}</Td>
        <Td dataLabel={columnNames.sellerId}>{data.sellerId}</Td>
        <Td dataLabel={columnNames.locationId}>{data.locationId}</Td>
        <Td dataLabel={columnNames.status}>{data.status}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`${data.name}`)}>View</Button>
            </TableText>
        </Td>
    </Tr>;

export const TableSales: React.FunctionComponent = () => {
    return <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getSales} // todo
    />
}