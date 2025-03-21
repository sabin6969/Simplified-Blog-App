class AppStatusCode {

    static #sucess = 200;
    static #badRequest = 400;
    static #internalServerError = 500;
    static #unauthorized = 401;
    static #notFound = 404;
    static #forbidden = 403;

    /// to be used when the server sucessfully serve's the client request (as expected!)
    static get sucessCode() {
        return this.#sucess;
    }

    static get badRequestCode() {
        return this.#badRequest;
    }

    static get internalServerErrorCode() {
        return this.#internalServerError;
    }

    static get unauthorizedCode() {
        return this.#unauthorized;
    }

    static get notFoundStatusCode() {
        return this.#notFound;
    }

    static get forbiddenCode() {
        return this.#forbidden;
    }

}

export default AppStatusCode;