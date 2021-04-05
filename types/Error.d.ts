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
    readonly rawType: EduDashRawErrorType;
    readonly code?: string;
    readonly doc_url?: string;
    readonly param?: string;
    readonly headers?: {
        [header: string]: string;
    };
    readonly requestId?: string;
    readonly statusCode?: number;
    constructor(raw: EduDashErrorRaw);
    static generate(raw: EduDashErrorRaw): EduDashError;
}
export declare class EduDashAPIError extends EduDashError {
}
export declare class EduDashAuthenticationError extends EduDashError {
}
