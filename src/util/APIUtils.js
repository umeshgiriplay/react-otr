import {ACCESS_TOKEN, API_BASE_URL} from '../constants/constant';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};
const fromDataRequest = (formData) => {
    const headers = new Headers();

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    formData = Object.assign({}, defaults, formData);

    return fetch(formData.url, formData)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function bookTicket() {
    return request({
        url: API_BASE_URL + "/ticket",
        method: 'POST'
    });
}

export function makePayment(ticketId) {
    return request({
        url: API_BASE_URL + "/ticket/payment/"+ticketId,
        method: 'POST'
    });
}

export function getTickets() {
    return request({
        url: API_BASE_URL + "/tickets",
        method: 'GET'
    });
}

export function getInsights() {
    return request({
        url: API_BASE_URL + "/tickets/insights",
        method: 'GET'
    });
}
