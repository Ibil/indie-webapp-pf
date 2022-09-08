import { refresh } from "./Users";

export const getLocations = async () => {
    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/locations`,
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        console.log(result.data);
    }
    console.log(response);
    await refresh();
}