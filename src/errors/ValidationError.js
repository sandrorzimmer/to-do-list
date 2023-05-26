import BadRequest from "./badRequest.js";


class ValidationError extends BadRequest {
    constructor(error) {
        const errorMessages = Object.values(error.errors);
        errorMessages
            .map(error => error.message)
            .join("; ");
        super(`The following errors were found: ${errorMessages}`);
    }
}

export default ValidationError;