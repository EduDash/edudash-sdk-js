"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EduDash = void 0;
const events_1 = __importDefault(require("events"));
const utils_1 = require("../utils");
const ALLOWED_CONF_PROPERTIES = [
    'apiVersion',
    'typescript',
    'maxNetworkRetries',
    'httpAgent',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
];
const APP_INFO_PROPERTIES = ['name', 'version', 'url'];
const DEFAULT_HOST = 'api.edudash.org';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = `/v1/`;
const DEFAULT_API_VERSION = null;
const DEFAULT_TIMEOUT = 80000;
const MAX_NETWORK_RETRY_DELAY_SEC = 2;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
/**
 * EduDash API Client
 * @example
 * const EduDash = require('edudash');
 *
 * const client = new EduDash.EduDash('secret-key');
 */
class EduDash extends events_1.default {
    constructor(apiKey, _config) {
        super();
        this.PACKAGE_VERSION = require('../../package.json').version;
        this.USER_AGENT = {
            bindings_version: this.PACKAGE_VERSION,
            lang: 'node',
            lang_version: process.version,
            platform: process.platform,
            publisher: 'edudash',
            uname: null,
            typescript: false,
        };
        this.props = _config || {};
        if (this.props.protocol &&
            this.props.protocol !== 'https' &&
            (!this.props.host || /\.edudash.org$/.test(this.props.host))) {
            throw new Error('The `https` protocol must be used to send requests to `*.edudash.org`');
        }
        this._api = {
            auth: null,
            host: this.props.host || DEFAULT_HOST,
            port: this.props.port || DEFAULT_PORT,
            protocol: this.props.protocol || 'https',
            basePath: DEFAULT_BASE_PATH,
            version: this.props.apiVersion || DEFAULT_API_VERSION,
            timeout: this.props.timeout || DEFAULT_TIMEOUT,
            maxNetworkRetries: this.props.maxNetworkRetries || 0,
            agent: this.props.httpAgent || require('http').Agent,
            dev: false,
        };
        const typescript = this.props.typescript || false;
        if (typescript !== this.USER_AGENT.typescript) {
            this.USER_AGENT.typescript = typescript;
        }
        if (this.props.appInfo) {
            this._setAppInfo(this.props.appInfo);
        }
    }
    _setAppInfo(info) {
        if (info && typeof info !== 'object') {
            throw new Error('AppInfo must be an object');
        }
        if (info && !info.name) {
            throw new Error('AppInfo.name is required');
        }
        info = info || {};
        this._appInfo = info;
    }
    _setApiField(key, val) {
        return utils_1.getKeyValue(this._api)(val);
    }
    _getApiField(key) {
        return utils_1.getKeyValue(this._api)(key);
    }
    _setApiKey(key) {
        if (key) {
            this._setApiField('auth', `Bearer ${key}`);
        }
    }
}
exports.EduDash = EduDash;
exports.default = EduDash;
