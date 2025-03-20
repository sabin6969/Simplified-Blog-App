class ApiResponse {
    /**
     * 
     * @param {number} statusCode 
     * @param {boolean} sucess defaults to true
     * @param {string} message 
     * @param {object} data 
     */
    constructor(statusCode, message, data, sucess = true) {
        this.statusCode = statusCode;
        this.sucess = sucess;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
