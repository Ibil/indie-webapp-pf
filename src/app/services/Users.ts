import { getLocations } from "./Locations";


export const registerUser = async (un: string, pw: string) => {
    console.log(un + pw );

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })

    const myBody = { 
        "username": un,
        "password": pw 
    }
    console.log(JSON.stringify(myBody));

    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/users`,
        {
            method: 'POST', headers: myHeaders, body: JSON.stringify(myBody)
        });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        console.log(result.data);
        return result.data;
    }
}

export const login = async (un: string, pw: string) => {

    const myBody = { 
        "username": un,
        "password": pw 
    }

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })

    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/auth/login`, 
    {
        method: 'POST', 
        headers: myHeaders, 
        credentials: "include",
        body: JSON.stringify(myBody)
    });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        console.log(response.headers);
        console.log(result.data);
        
        //getLocations();
        return result.data.role;
    }
}

export const logout = async () => {
    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/auth/logout`, { method: 'POST' });
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        console.log(result.data);
    }
}

/*
ex
  const myHeaders = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${btEdit.dataset.token}`
        })
*/