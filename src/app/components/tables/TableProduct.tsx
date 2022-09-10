import { Product } from "@app/model/Product";
import { getProducts } from "@app/services/Products";
import React from "react";
import { TableIlx } from "../common/TableIlx";

const columnNames = {
    name: 'Product Name',
    category: 'Category',
    status: 'Status',
    price: 'Price'
};

// Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
// This example is trivial since our data objects just contain strings, but if the data was more complex
// this would be a place to return simplified string or number versions of each column to sort by.
export const getSortableRowValues = (editProducts : Product):(any)[] =>
        [editProducts.name, editProducts.category, editProducts.status, editProducts.price];

export const TableProduct: React.FunctionComponent = () => {
    return <TableIlx
        columnNames={columnNames}
        getItems={getProducts}
        getSortableRowValues={getSortableRowValues}
    />
}