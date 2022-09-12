import { ProductCategory, StockWithProductID } from "@app/model/Product";
import { WEB_API_HOST } from "./common";
import { refresh } from "./Users";

const LIMIT = 100;
export const PRODUCTS_ENDPOINT = WEB_API_HOST + `products?limit=100&page=0&stock=false`;

export const getProducts = async (category?: ProductCategory, skipRetry?: boolean) => {
    const response = await fetch(`${PRODUCTS_ENDPOINT}${category ? `&category=${category}` : ``}`);
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getProducts(category, true);
    }
    else{
        throw Error;
    }
}

export const getProductById = async (id: string, skipRetry?: boolean) => {
    const response = await fetch(`${WEB_API_HOST}products/${id}`,{
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getProductById(id, true);
    }
    else{
        throw Error;
    }
}


export const getProductByIdProtected = async (id: string, skipRetry?: boolean) => {
    const response = await fetch(`${WEB_API_HOST}products/${id}/protected`,{
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getProductByIdProtected(id, true);
    }
    else{
        throw Error;
    }
}

export const createProduct = async (product, skipRetry?: boolean) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    const response = await fetch(`${WEB_API_HOST}products/${product.category}s`,
    {
        method: 'POST', 
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify(product)
    });
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return createProduct(product, true);
    }
    else{
        throw Error;
    }
}

export const updateProduct = async (product, skipRetry?: boolean) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    const response = await fetch(`${WEB_API_HOST}products/${product.productId}/protected`,
    {
        method: 'PATCH', 
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify(product)
    });
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return updateProduct(product, true);
    }
    else{
        throw Error;
    }
}


export const updateProductStock = async (stock: StockWithProductID, skipRetry?: boolean) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    const response = await fetch(`${WEB_API_HOST}products/${stock.productId}/stock`,
    {
        method: 'PATCH', 
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify({
            list: [
                {
                    locationId: stock.locationId,
                    quantity: stock.quantity
                }
            ]
        })
    });
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return updateProductStock(stock, true);
    }
    else{
        throw Error;
    }
}