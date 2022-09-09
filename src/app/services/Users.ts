


export const registerUser = async (un: string, pw: string) => {

    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })

    const myBody = { 
        "username": un,
        "password": pw,
        "name": un
    }

    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/users`,
        {
            method: 'POST', 
            headers: myHeaders, 
            credentials: "include", 
            body: JSON.stringify(myBody)
        });
    if (response.status >= 200 && response.status < 300) {
    }
    return;
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
        return result.data.role;
    }
}

export const refresh = async () => {


    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/auth/refresh`, 
    {
        method: 'POST', 
        credentials: "include", // ?? needed?
    });
    if (response.status >= 200 && response.status < 300) {
        console.log(response.headers);
    }
}

export const logout = async () => {
    const response = await fetch(`https://api-store-indielisboa.herokuapp.com/v1/auth/logout`, { method: 'POST' });
    if (response.status >= 200 && response.status < 300) {
    }
}
