import { ProductCategory } from "@app/model/Product";
import { WEB_API_HOST } from "./common";
import { refresh } from "./Users";

const LIMIT = 100;
export const PRODUCTS_ENDPOINT = WEB_API_HOST + `products?limit=100&page=0&stock=false`;

export const getProducts = async (category: ProductCategory | undefined, skipRetry?: boolean) => {
    const response = await fetch(`${PRODUCTS_ENDPOINT}${category ? `&category=${category}` : ``}`);
    if (response.status >= 200 && response.status < 300) {
        console.log("ok");
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        console.log("skip retry = " + skipRetry);
        await refresh();
        return getProducts(category, true);
    }
    else{
        console.log("throw");
        throw Error;
    }
}