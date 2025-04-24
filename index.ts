
import 'unfetch/polyfill';
async function processResponse(res: Response) {
    let retVal;
    // if(res.status == 404){
    //     throw 404;
    // }
    let ct = res.headers.get('content-type');
    if (ct && ct.includes('application/json')) {
        try {
            retVal = await res.json();
        } catch (err) {
            console.error('error parsing response', err)
        }
        if (res.status != 200) {
            throw { ...retVal, status: res.status };
        }
        return retVal;
    }
    if (res.status != 200) {
        throw { message: await res.text(), status: res.status };
    }
}
export async function getJSON<T = {}>(url) {
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        },
        mode: 'cors',
        credentials: 'include'
    });
    return await processResponse(res) as T;

}

export async function postJSON<T = {}>(url, data) {
    // Default options are marked with *
    let res = await fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'client', // *client, no-referrer
    });
    return await processResponse(res) as T;
}
export async function postForm<T = {}>(url, data) {
    // Default options are marked with *
    let res = await fetch(url, {
        body: data,
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'client', // *client, no-referrer
    });
    return await processResponse(res);


}