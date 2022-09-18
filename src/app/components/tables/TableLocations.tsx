import { SellLocation } from "@app/model/SellLocation";
import { getLocations } from "@app/services/Locations";
import { ActionGroup, Button, Form, PageSection } from "@patternfly/react-core";
import { TableText, Td, Th, Tr } from '@patternfly/react-table';
import React from "react";
import { useHistory } from "react-router-dom";
import { TableIlx } from "../common/TableIlx";

import tablePaddingStyles from '../ProductTable.module.css';


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
                <Button variant="secondary" onClick={() => history.push(`/listLocations/viewStock/${data.locationId}`)}>View Stock</Button>
            </TableText>
        </Td>
    </Tr>;

export const TableLocations: React.FunctionComponent = () => {
    const history = useHistory();

    return <PageSection>
        <Form onSubmit={e => { e.preventDefault(); }}>
            <ActionGroup className={tablePaddingStyles.topActionGroupPadding}>
            <Button variant="primary" onClick={() => history.push('/listlocations/create')}>Create new Location</Button>
            </ActionGroup>
        </Form>
    
    <TableIlx
        getSortableRowValues={getSortableRowValues}
        buildTableHeaders={buildTableHeaders}
        buildTableBody={buildTableBody}
        getItems={getLocations}
    />
    </PageSection>
}