import "@patternfly/react-core/dist/styles/base.css";

import { Bullseye, EmptyState, EmptyStateIcon, EmptyStateVariant, Title } from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { TableComposable, Tbody, Td, Thead, ThProps, Tr } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ErrorFetchingData } from "./ErrorFetchingData";
import { LoadingSpinner } from "./LoadingSpinner";



export interface TableData {
  getSortableRowValues: (repo: any) => (string | number)[]; // T
  buildTableHeaders: () => any;
  buildTableBody: (data, rowIndex, history) => any;
  getItems?: () => Promise<any[]>;
  tableEntityID?: string;
  getItemsWithId?: (id: string) => Promise<any[]>;
}

export const TableIlx: React.FunctionComponent<TableData> = (
  { getSortableRowValues, buildTableHeaders, buildTableBody, getItems, tableEntityID, getItemsWithId }: TableData) => {

  const history = useHistory();

  const [rowsData, setRowsData] = useState<any[]>([]);
  const [sortedRowsData, setSortedRowsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Note: if you intend to make columns reorderable, you may instead want to use a non-numeric key
  // as the identifier of the sorted column. See the "Compound expandable" example.
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(null);

  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | null>(null);

  const sortRowData = () => {
    return rowsData.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex as number];
      const bValue = getSortableRowValues(b)[activeSortIndex as number];
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

  const buildEmptyTableBody = () =>
    <Tr key={0}>
      <Td colSpan={8}>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.small}>
            <EmptyStateIcon icon={SearchIcon} />
            <Title headingLevel="h2" size="lg">
              No Data
            </Title>
          </EmptyState>
        </Bullseye>
      </Td>
    </Tr>;


  const reloadItems = async () => {
    if (getItems !== undefined) {
      getItems().then(items => {
        setRowsData(items);
        setSortedRowsData(items);
        setLoading(false);
      })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        });
    }
    else{
      getItemsWithId!(tableEntityID!).then(items => {
        setRowsData(items);
        setSortedRowsData(items);
        setLoading(false);
      })
        .catch(() => {
          setHasError(true);
          setLoading(false)
        });
    }
  };

  const fillBody = () => {
    if (sortedRowsData.length !== 0) {
      return sortedRowsData.map((data, rowIndex) => buildTableBody(data, rowIndex, history));
    }
    else {
      return buildEmptyTableBody();
    }
  }

  const drawBody = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    else if (hasError) {
      return <ErrorFetchingData />
    }
    else {
      return fillBody();
    }
  }

  useEffect(() => {
    reloadItems();
  }, []);

  useEffect(() => {
    if (rowsData.length > 0) {
      if (activeSortIndex !== null) {
        setSortedRowsData(sortRowData());
      }

    }
  }, [loading, hasError]);

  useEffect(() => {
  }, [rowsData]);

  return (
    <TableComposable aria-label="Sortable table">
      <Thead>
        {buildTableHeaders()}
      </Thead>
      <Tbody>
        {drawBody()}
      </Tbody>
    </TableComposable>
  );
};