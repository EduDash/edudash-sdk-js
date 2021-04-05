import { EduDashErrorRaw, EduDashRawErrorType } from './typings';

export type Errors = {
  generate: typeof EduDashError.generate;
  EduDashError: typeof EduDashError;
  EduDashAPIError: typeof EduDashAPIError;
};

/**
 * EduDashError is the base error type from which all other EduDash errors derive.
 * For errors returned from EduDash's REST API and Realtime WebSocket
 */
export class EduDashError extends Error {
  readonly type: Extract<keyof Errors, string>;
  readonly rawType: EduDashRawErrorType;
  readonly code?: string;
  readonly doc_url?: string;
  readonly param?: string;
  readonly headers?: { [header: string]: string };
  readonly requestId?: string;
  readonly statusCode?: number;

  constructor(raw: EduDashErrorRaw) {
    super(raw.message);
    this.statusCode = raw.statusCode;
    this.requestId = raw.requestId;
    this.headers = raw.headers;
    this.code = raw.code;
    this.doc_url = raw.doc_url;
    this.param = raw.param;
    this.type = <keyof Errors>this.constructor.name;
    this.rawType = raw.type;
  }

  static generate(raw: EduDashErrorRaw) {
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

export class EduDashAPIError extends EduDashError {}
export class EduDashAuthenticationError extends EduDashError {}
