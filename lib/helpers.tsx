import { setCookie, getCookie } from 'cookies-next';

interface apiProps {
    path: string;
    method: string,
    body?: object
    setToken?: boolean
}

export const api = async (props: apiProps) => {
    let headers = {
        "content-type": "application/json",
    }

    if (props.setToken) {
        const jwtHeader = {"x-jwt-token": getJWTToken()}
        headers = {...headers, ...jwtHeader}
    }

    let apiData = {
        method: props.method,
        headers: headers,
    }

    if (props.body) {
        const body = {body: JSON.stringify(props.body)}
        apiData = {...apiData, ...body}
    }

    return await fetch(`http://127.0.0.1:3002${props.path}`, apiData).then(async resp => {
        const data = await resp.json();
        return {status: resp.status, data: data};
    })
}

export const objectsToSelectOptions = (data: [index: string, string] | undefined) => {
    if (data == undefined) {
        return []
    }

    const arrayOfObj = Object.entries(data).map((e) => ({
            [e[0]]: e[1]
        }
    ));

    return arrayOfObj?.map(e => {
        const key = Object.keys(e)[0];
        return {
            key: key,
            name: e[key],
            chosen: false
        }
    })
}

export const JWT_TOKEN = "x-jwt-token"

export const setJWTToken = (token: string) => {
    setCookie(JWT_TOKEN, token)
}

export const getJWTToken = () => {
    return getCookie(JWT_TOKEN)
}