import "@patternfly/react-core/dist/styles/base.css";

import React from 'react';
import { TableComposable, Thead, Tr, Th, Tbody, Td, ThProps } from '@patternfly/react-table';

export interface Repository {
  name: string;
  branches: string;
  prs: string;
  workspaces: string;
  price: string;
}

export interface TableData {
  columnNames: any;
  rowData: any []; // T
  getSortableRowValues: (repo: Repository) => (string | number)[]; // T
}

export const TableIl: React.FunctionComponent<TableData> = ({ columnNames, rowData, getSortableRowValues }: TableData) => {

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
  

  // Note that we perform the sort as part of the component's render logic and not in onSort.
  // We shouldn't store the list of data in state because we don't want to have to sync that with props.
  let sortedRowData = rowData;
  if (activeSortIndex !== null) {
    sortedRowData = sortRowData(activeSortIndex);
  }

  // TODO generate dynamically
  // In this example, we wrap all but the 1st column and make the 1st and 3rd columns sortable just to demonstrate.
  return (
    <TableComposable aria-label="Sortable table">
      <Thead>
        <Tr>
          <Th sort={getSortParams(0)}>{columnNames.name}</Th>
          <Th modifier="wrap">{columnNames.branches}</Th>
          <Th modifier="wrap" sort={getSortParams(2)} info={{ tooltip: 'More information ' }}>
            {columnNames.prs}
          </Th>
          <Th modifier="wrap">{columnNames.workspaces}</Th>
          <Th modifier="wrap">{columnNames.price}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedRowData.map((repo, rowIndex) => (
          <Tr key={rowIndex}>
            <Td dataLabel={columnNames.name}>{repo.name}</Td>
            <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
            <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
            <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
            <Td dataLabel={columnNames.price}>{repo.price}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};