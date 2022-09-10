import { SellLocation } from "@app/model/SellLocation";
import { getLocations } from "@app/services/Locations";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    address: 'Adress'
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (location: SellLocation): (any)[] =>
    [location.address];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.address}</Th>
        <Th modifier="wrap">{"Actions"}</Th>
    </Tr>;

export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.address}>{data.address}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`${data.name}`)}>edit</Button>
            </TableText>
        </Td>
    </Tr>;

export const TableLocations: React.FunctionComponent = () => {
    return <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getLocations} // todo
    />
}