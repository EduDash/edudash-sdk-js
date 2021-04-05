import { EduDashErrorRaw, EduDashRawErrorType } from './typings';
export declare type Errors = {
    generate: typeof EduDashError.generate;
    EduDashError: typeof EduDashError;
    EduDashAPIError: typeof EduDashAPIError;
};
/**
 * EduDashError is the base error type from which all other EduDash errors derive.
 * For errors returned from EduDash's REST API and Realtime WebSocket
 */
export declare class EduDashError extends Error {
    readonly type: Extract<keyof Errors, string>;
    /**
     * The raw "error type" returned from the EduDash API
     * @docs https://edudash.org/docs/developers/errors
     */
    readonly rawType: EduDashRawErrorType;
    /**
     * A short string describing the kind of error that occurred, which
     * can be programmatically manipulated to handle specific errors
     * @docs https://edudash.org/docs/developers/error-codes
     */
    readonly code?: string;
    /**
     * A URL leading to EduDash's comprehensive documentation where you
     * can find more information about the error reported.
     * @docs https://edudash.org/docs/developers/error-codes
     */
    readonly doc_url?: string;
    /**
     * If this error has to do with a parameter.
     */
    readonly param?: string;
    readonly headers?: {
        [header: string]: string;
    };
    readonly requestId?: string;
    /**
     * A HTTP status code returned from the EduDash API describing the nature
     * of the error.
     */
    readonly statusCode?: number;
    constructor(raw: EduDashErrorRaw);
    static generate(raw: EduDashErrorRaw): EduDashError;
}
export declare class EduDashAPIError extends EduDashError {
}
export declare class EduDashAuthenticationError extends EduDashError {
}
