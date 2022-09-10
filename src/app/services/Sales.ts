import { WEB_API_HOST } from "./common";
import { refresh } from "./Users";

export const SALES_ENDPOINT = WEB_API_HOST + `sales`;

export const getSales = async (skipRetry?: boolean) => {
    const response = await fetch(SALES_ENDPOINT,
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