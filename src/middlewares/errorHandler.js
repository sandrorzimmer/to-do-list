import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequest from "../errors/badRequest.js";
import ValidationError from "../errors/validationError.js";
import NotFound from "../errors/NotFound.js";


function errorHandler(error, req, res, next) {
    if (error instanceof mongoose.CastError) {
        new BadRequest().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);
    } else if (error instanceof NotFound) {
        error.sendResponse(res);
    } else {
        new BaseError().sendResponse(res);
    }
}

export default errorHandler;