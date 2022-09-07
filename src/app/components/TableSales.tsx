import React from "react"
import { DateTimeRangePickerIlx } from "./common/DateTimeRangePickerIlx";
import { Repository, TableIlx } from "./common/TableIlx"


const rowData: Repository[] = [
    { name: 'one', branches: 'two', prs: 'a', workspaces: 'four', price: 'five' },
    { name: 'a', branches: 'two', prs: 'k', workspaces: 'four', price: 'five' },
    { name: 'p', branches: 'two', prs: 'b', workspaces: 'four', price: 'five' }
];

const columnNames = {
    name: 'Repositories table header that goes on for a long time.',
    branches: 'Branches table header that goes on for a long time.',
    prs: 'Pull requests table header that goes on for a long time.',
    workspaces: 'Workspaces table header that goes on for a long time.',
    price: 'price'
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
const getSortableRowValues =
    ({ name, branches, prs, workspaces, price }: Repository):
        (string | number)[] =>
        [name, branches, prs, workspaces, price];

export const TableSales: React.FunctionComponent = () => {
    return <>
        <DateTimeRangePickerIlx />
        <TableIlx
            columnNames={columnNames}
            rowData={rowData}
            getSortableRowValues={getSortableRowValues} />
    </>
}