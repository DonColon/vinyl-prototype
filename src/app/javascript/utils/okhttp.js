class HttpClient {

    constructor(options = {}) {
        this._defaultOptions = options;
    }

    async post(url, body, headers = {}) {
        const overridenHeaders = {...this._defaultOptions.headers, ...headers};

        const options = {
            method: 'POST',
            headers: overridenHeaders,
            body: JSON.stringify(body)
        };

        const overridenOptions = {...this._defaultOptions, ...options};
    
        const response = await fetch(url, overridenOptions),
            data = await response.json();

        return data;
    }

    async get(url, headers = {}) {
        const overridenHeaders = {...this._defaultOptions.headers, ...headers};

        const options = {
            method: 'GET',
            headers: overridenHeaders
        };

        const overridenOptions = {...this._defaultOptions, ...options};

        const response = await fetch(url, overridenOptions),
            data = await response.json();

        return data;
    }

    async put(url, body, headers = {}) {
        const overridenHeaders = {...this._defaultOptions.headers, ...headers};

        const options = {
            method: 'PUT',
            headers: overridenHeaders,
            body: JSON.stringify(body)
        };

        const overridenOptions = {...this._defaultOptions, ...options};
    
        const response = await fetch(url, overridenOptions),
            data = await response.json();
    
        return data;
    }

    async patch(url, body, headers = {}) {
        const overridenHeaders = {...this._defaultOptions.headers, ...headers};

        const options = {
            method: 'PATCH',
            headers: overridenHeaders,
            body: JSON.stringify(body)
        };

        const overridenOptions = {...this._defaultOptions, ...options};

        const response = await fetch(url, overridenOptions),
            data = await response.json();

        return data;
    }

    async delete(url, headers = {}) {
        const overridenHeaders = {...this._defaultOptions.headers, ...headers};

        const options = {
            method: 'DELETE',
            headers: overridenHeaders
        };

        const overridenOptions = {...this._defaultOptions, ...options};
    
        fetch(url, overridenOptions);
    }
    
}

class HttpClientBuilder {

    constructor() {
        this._defaultOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
    }

    addHeader(name, value) {
        this._defaultOptions.headers[name] = value;
        return this;
    }

    removeHeader(name) {
        delete this._defaultOptions.headers[name];
        return this;
    }

    headers(headers) {
        this._defaultOptions.headers = headers;
        return this;
    }

    requestMode(mode) {
        this._defaultOptions.mode = mode;
        return this;
    }

    sendCredentialsInRequest(credentials) {
        this._defaultOptions.credentials = credentials;
        return this;
    }

    cachingMode(mode) {
        this._defaultOptions.cache = mode;
        return this;
    }

    redirectMode(mode) {
        this._defaultOptions.redirect = mode;
        return this;
    }

    referrer(referrer) {
        this._defaultOptions.referrer = referrer;
        return this;
    }

    referrerPolicy(policy) {
        this._defaultOptions.referrerPolicy = policy;
        return this;
    }

    integrity(integrity) {
        this._defaultOptions.integrity = integrity;
        return this;
    }

    keepAlive(keepAlive) {
        this._defaultOptions.keepalive = keepAlive;
        return this;
    }

    signal(signal) {
        this._defaultOptions.signal = signal;
        return this;
    }

    build() {
        return new HttpClient(this._defaultOptions);
    }

}


class UrlBuilder {

    constructor(hostUrl) {
        this._url = new URL(hostUrl);
    }

    protocol(protocol) {
        this._url.protocol = protocol;
        return this;
    }

    port(port) {
        this._url.port = port;
        return this;
    }

    host(host) {
        this._url.host = host;
        return this;
    }

    login(username, password) {
        this._url.username = username;
        this._url.password = password;
        return this;
    }

    addPathSegment(path) {
        this._url.pathname += path;
        return this;
    }

    addQueryParameter(key, value) {
        this._url.searchParams.append(key, value);
        return this;
    }

    hash(hash) {
        this._url.hash = hash;
        return this;
    }

    build() {
        return new URL(this._url);
    }

}

export { HttpClientBuilder, UrlBuilder };
