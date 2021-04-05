/// <reference path="Error.d.ts" />
/// <reference types="node" />
import EventEmitter from 'events';
import { EduDashUserAgent } from './typings';
import { EduDashConfig } from './lib';
import './Error';
import { Errors } from './Error';
/**
 * EduDash API Client
 * @example
 * const EduDash = require('edudash');
 *
 * const client = new EduDash.EduDash('secret-key');
 */
export declare class EduDash extends EventEmitter {
    static EduDash: typeof EduDash;
    private props;
    private _api;
    private _appInfo;
    static errors: Errors;
    errors: Errors;
    PACKAGE_VERSION: string;
    USER_AGENT: EduDashUserAgent;
    constructor(apiKey: string, _config: EduDashConfig);
    private _setAppInfo;
    private _setApiField;
    private _getApiField;
    private _setApiKey;
}
declare const _default: typeof EduDash;
export default _default;
