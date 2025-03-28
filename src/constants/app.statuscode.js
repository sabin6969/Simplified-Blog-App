class AppStatusCode {

    static #sucess = 200;
    static #created = 201;
    static #badRequest = 400;
    static #internalServerError = 500;
    static #unauthorized = 401;
    static #notFound = 404;
    static #forbidden = 403;
    static #tooManyRequest = 429;
    static #conflict = 409;

    /// to be used when the server sucessfully serve's the client request (as expected!)
    static get sucessCode() {
        return this.#sucess;
    }

    static get createdCode() {
        return this.#created;
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

    static get tooManyRequestCode() {
        return this.#tooManyRequest;
    }

    static get conflictCode() {
        return this.#conflict;
    }

    // TODO: add more statusCodes if required
}

export default AppStatusCode;