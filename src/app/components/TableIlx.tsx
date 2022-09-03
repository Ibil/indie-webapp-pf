import "@patternfly/react-core/dist/styles/base.css";

import React from 'react';
import { TableComposable, TableText, Thead, Tr, Th, Tbody, Td, ThProps } from '@patternfly/react-table';
import { Bullseye, Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Title } from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { useHistory } from "react-router-dom";

export interface Repository {
  name: string;
  branches: string;
  prs: string;
  workspaces: string;
  price: string;
}

export interface TableData {
  columnNames: any;
  rowData: any[]; // T
  getSortableRowValues: (repo: Repository) => (string | number)[]; // T
}

export const TableIlx: React.FunctionComponent<TableData> = ({ columnNames, rowData, getSortableRowValues }: TableData) => {

  const history = useHistory();

  // Note: if you intend to make columns reorderable, you may instead want to use a non-numeric key
  // as the identifier of the sorted column. See the "Compound expandable" example.
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(null);

  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | null>(null);

  const sortRowData = (activeSortIndex: number) => {
    return rowData.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        // Numeric sort
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
      defaultDirection: 'asc' // starting sort direction when first sorting a column. Defaults to 'asc'
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });


  // TODO generate headers dynamically
  const buildTableHeaders = () =>
    <Tr>
      <Th sort={getSortParams(0)}>{columnNames.name}</Th>
      <Th modifier="wrap">{columnNames.branches}</Th>
      <Th modifier="wrap" sort={getSortParams(2)} info={{ tooltip: 'More information ' }}>
        {columnNames.prs}
      </Th>
      <Th modifier="wrap">{columnNames.workspaces}</Th>
      <Th modifier="wrap">{columnNames.price}</Th>
    </Tr>;


  // TODO generate dynamically
  const buildTableBody = (data, rowIndex) =>
    <Tr key={rowIndex}>
      <Td dataLabel={columnNames.name}>{data.name}</Td>
      <Td dataLabel={columnNames.branches}>{data.branches}</Td>
      <Td dataLabel={columnNames.prs}>{data.prs}</Td>
      <Td dataLabel={columnNames.workspaces}>
        <TableText>
          <Button variant="secondary" onClick={() => history.push(`editProduct/${data.name}`)}>edit</Button>
        </TableText>
      </Td>
      <Td dataLabel={columnNames.price}>{data.price}</Td>
    </Tr>;

  const buildEmptyTableBody = () =>
    <Td colSpan={8}>
      <Bullseye>
        <EmptyState variant={EmptyStateVariant.small}>
          <EmptyStateIcon icon={SearchIcon} />
          <Title headingLevel="h2" size="lg">
            No results found
          </Title>
          <EmptyStateBody>Clear all filters and try again.</EmptyStateBody>
          <Button variant="link">Clear all filters</Button>
        </EmptyState>
      </Bullseye>
    </Td>;


  // Note that we perform the sort as part of the component's render logic and not in onSort.
  // We shouldn't store the list of data in state because we don't want to have to sync that with props.
  let sortedRowData = rowData;
  if (activeSortIndex !== null) {
    sortedRowData = sortRowData(activeSortIndex);
  }


  // In this example, we wrap all but the 1st column and make the 1st and 3rd columns sortable just to demonstrate.
  return (
    <TableComposable aria-label="Sortable table">
      <Thead>
        {buildTableHeaders()}
      </Thead>
      <Tbody>
        {sortedRowData.length == 0 ? buildEmptyTableBody() : sortedRowData.map((data, rowIndex) => buildTableBody(data, rowIndex))}
      </Tbody>
    </TableComposable>
  );
};