"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EduDashAuthenticationError = exports.EduDashAPIError = exports.EduDashError = void 0;
/**
 * EduDashError is the base error type from which all other EduDash errors derive.
 * For errors returned from EduDash's REST API and Realtime WebSocket
 */
class EduDashError extends Error {
    constructor(raw) {
        super(raw.message);
        this.statusCode = raw.statusCode;
        this.requestId = raw.requestId;
        this.headers = raw.headers;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.type = this.constructor.name;
        this.rawType = raw.type;
    }
    static generate(raw) {
        switch (raw.type) {
            case 'api_error':
                return new EduDashAPIError(raw);
            case 'authentication_error':
                return new EduDashAuthenticationError(raw);
            default:
                return new EduDashError({
                    message: 'Unknown Error',
                    type: 'api_error',
                });
        }
    }
}
exports.EduDashError = EduDashError;
class EduDashAPIError extends EduDashError {
}
exports.EduDashAPIError = EduDashAPIError;
class EduDashAuthenticationError extends EduDashError {
}
exports.EduDashAuthenticationError = EduDashAuthenticationError;
