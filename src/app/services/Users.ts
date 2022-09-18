import { User } from "@app/model/User";
import { WEB_API_HOST } from "./common";



export const registerUser = async (un: string, pw: string) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    const myBody = { 
        "username": un,
        "password": pw,
        "name": un,
    };

    const response = await fetch(WEB_API_HOST + `users`,
        {
            method: 'POST', 
            headers: myHeaders, 
            credentials: "include", 
            body: JSON.stringify(myBody),
        });
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    else {
        throw Error;
    }
}

export const login = async (un: string, pw: string) => {
    let role: string | undefined;

    const myBody = { 
        "username": un,
        "password": pw,
    };

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    const response = await fetch(WEB_API_HOST + `auth/login`, 
    {
        method: 'POST', 
        headers: myHeaders, 
        credentials: "include",
        body: JSON.stringify(myBody),
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json(); 
        role = result.data.role;
        return role;
    }
    else {
        throw Error;
    }    
}

export const refresh = async () => {
    const response = await fetch(WEB_API_HOST + `auth/refresh`, 
    {
        method: 'POST', 
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    else{
        throw Error;
    }
}

export const logout = async () => {
    const response = await fetch(WEB_API_HOST + `auth/logout`, { method: 'POST' });
}


export const getUsers = async (skipRetry?: boolean) => {
    const response = await fetch(WEB_API_HOST + "users",
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getUsers(true);
    }
    else{
        throw Error;
    }
}

export const getUserByID = async (id: string, skipRetry?: boolean) => {
    const response = await fetch(WEB_API_HOST + "users/" + id + "/fullinfo",
    {
        credentials: "include",
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return getUserByID(id, true);
    }
    else{
        throw Error;
    }
}

export const updateUserByID = async (user: User, skipRetry?: boolean) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });
    const response = await fetch(WEB_API_HOST + "users/" + user.userId + "/fullinfo",
    {
        method: 'PATCH', 
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify(user)
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result.data;
    }
    else if(response.status === 401 && !skipRetry){
        await refresh();
        return updateUserByID(user, true);
    }
    else{
        throw Error;
    }
}
