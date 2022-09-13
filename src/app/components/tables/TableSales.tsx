import { Sale } from "@app/model/Sale";
import { SellLocation } from "@app/model/SellLocation";
import { User } from "@app/model/User";
import { getLocations } from "@app/services/Locations";
import { getSales } from "@app/services/Sales";
import { getUsers } from "@app/services/Users";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    saleId: 'Sale ID',
    sellerName: "Seller",
    sellLocation: "Location",
    createdAt: "Date",
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (item: any): (any)[] =>
    [item.saleId, item.sellerName, item.sellLocation, item.createdAt];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.saleId}</Th>
        <Th modifier="wrap" >{columnNames.sellerName}</Th>
        <Th modifier="wrap" >{columnNames.sellLocation}</Th>
        <Th modifier="wrap" >{columnNames.createdAt}</Th>
        <Th modifier="wrap">{"Actions"}</Th>
    </Tr>;

export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.saleId}>{data.saleId}</Td>
        <Td dataLabel={columnNames.sellerName}>{data.sellerName}</Td>
        <Td dataLabel={columnNames.sellLocation}>{data.sellLocation}</Td>
        <Td dataLabel={columnNames.createdAt}>{data.createdAt}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`${data.name}`)}>View</Button>
            </TableText>
        </Td>
    </Tr>;

export const getItems = (): Promise<any[]> => {
    return Promise.all(
        [
            getSales(),
            getUsers(),
            getLocations()
        ]
    ).then(zip => {
        const sales: Sale[] = zip[0];
        const users: User[] = zip[1];
        const locations: SellLocation[] = zip[2]

        return sales.map( sale => {
            return {
                ...sale,
                sellerName: users.find(user => user.userId == sale.sellerId)?.name,
                sellLocation: locations.find(loc => loc.locationId == sale.locationId)?.address
            }
        })
    });
}

export const TableSales: React.FunctionComponent = () => {
    return <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getItems}
    />
}