import { SellLocation } from "@app/model/SellLocation";
import { WEB_API_HOST } from "./common";
import { refresh } from "./Users";

export const LOCATIONS_ENDPOINT = WEB_API_HOST + `locations/`;

export const getLocations = async (skipRetry?: boolean) => {
    const response = await fetch(LOCATIONS_ENDPOINT,
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getLocations(true);
    }
    else{
        throw Error;
    }
}

export const getLocationByID = async (id: string, skipRetry?: boolean) => {
    const response = await fetch(LOCATIONS_ENDPOINT + id,
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getLocationByID(id, true);
    }
    else{
        throw Error;
    }
}

export const createLocation = async (location: SellLocation, skipRetry?: boolean) => {

    
    const response = await fetch(LOCATIONS_ENDPOINT,
    {
        method: 'POST', 
        credentials: "include",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ address: location.address})
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getLocations(true);
    }
    else{
        throw Error;
    }
}