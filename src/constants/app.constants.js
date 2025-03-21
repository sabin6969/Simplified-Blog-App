class AppConstants {
    static #tokenKey = "refreshToken";

    static get tokenKey() {
        return this.#tokenKey;
    }
}

export default AppConstants;