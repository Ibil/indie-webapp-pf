import { WEB_API_HOST } from "./common";
import { refresh } from "./Users";

export const getLocations = async () => {
    const response = await fetch(WEB_API_HOST + `locations`,
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