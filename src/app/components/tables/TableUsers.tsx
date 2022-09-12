import { User } from "@app/model/User";
import { getUsers } from "@app/services/Users";
import { Button } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { TableIlx } from "../common/TableIlx";


const columnNames = {
    name: 'Name',
    role: 'Status'
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (editProducts: User): (any)[] =>
    [editProducts.name, editProducts.role];


export const buildTableHeaders = () =>
    <Tr>
        <Th modifier="wrap" >{columnNames.name}</Th>
        <Th modifier="wrap" >{columnNames.role}</Th>
        <Th modifier="wrap">{"Actions"}</Th>
    </Tr>;

export const buildTableBody = (data, rowIndex, history) =>
    <Tr key={rowIndex}>
        <Td dataLabel={columnNames.name}>{data.name}</Td>
        <Td dataLabel={columnNames.role}>{data.role}</Td>
        <Td dataLabel={"Actions"}>
            <TableText>
                <Button variant="secondary" onClick={() => history.push(`${data.userId}`)}>edit</Button>
            </TableText>
        </Td>
    </Tr>;

export const TableUsers: React.FunctionComponent = () => {
    return <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getUsers}
    />
}