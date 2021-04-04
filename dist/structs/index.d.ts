/// <reference types="node" />
import EventEmitter from 'events';
import { EduDashUserAgent } from '../typings';
import { EduDashConfig } from './lib';
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
    PACKAGE_VERSION: string;
    USER_AGENT: EduDashUserAgent;
    constructor(apiKey: string, _config: EduDashConfig);
    private _setAppInfo;
    private _setApiField;
    private _getApiField;
    private _setApiKey;
}
export default EduDash;
