import { WEB_API_HOST } from "./common";
import { refresh } from "./Users";

export const SALES_ENDPOINT = WEB_API_HOST + `sales`;

export const getSales = async (skipRetry?: boolean) => {
    const response = await fetch(SALES_ENDPOINT + '?limit=10000',
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getSales(true);
    }
    else{
        throw Error;
    }
}

export const getSaleById = async (saleId: string, skipRetry?: boolean) => {
    const response = await fetch(SALES_ENDPOINT + '/' + saleId,
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getSaleById(saleId, true);
    }
    else{
        throw Error;
    }
}

export const createSale = async (locationStock, skipRetry?: boolean) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    const response = await fetch(`${WEB_API_HOST}sales`,
    {
        method: 'POST', 
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify(locationStock),
    });
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return createSale(locationStock, true);
    }
    else{
        throw Error;
    }
}
