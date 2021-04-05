export declare type EduDashRawErrorType = 'api_error' | 'authentication_error';
export declare type EduDashErrorRaw = {
    message?: string;
    type: EduDashRawErrorType;
    code?: string;
    doc_url?: string;
    param?: string;
    headers?: {
        [header: string]: string;
    };
    requestId?: string;
    statusCode?: number;
};
