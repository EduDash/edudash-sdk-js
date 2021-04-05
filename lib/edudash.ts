///<reference path="./Error.ts" />
import EventEmitter from 'events';
import { EduDashApiConfiguration, EduDashUserAgent } from './typings';
import { getKeyValue } from './utils';
import { AppInfo, EduDashConfig } from './lib';
import './Error';
import { Errors } from './Error';

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
export class EduDash extends EventEmitter {
  static EduDash: typeof EduDash;

  private props: EduDashConfig;
  private _api: EduDashApiConfiguration;
  private _appInfo!: AppInfo;
  static errors: Errors;
  errors: Errors;

  PACKAGE_VERSION: string;
  USER_AGENT: EduDashUserAgent;

  constructor(apiKey: string, _config: EduDashConfig) {
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

    if (
      this.props.protocol &&
      this.props.protocol !== 'https' &&
      (!this.props.host || /\.edudash.org$/.test(this.props.host))
    ) {
      throw new Error(
        'The `https` protocol must be used to send requests to `*.edudash.org`'
      );
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

    this.errors = require('./Error');
  }

  private _setAppInfo(info: AppInfo): void {
    if (info && typeof info !== 'object') {
      throw new Error('AppInfo must be an object');
    }

    if (info && !info.name) {
      throw new Error('AppInfo.name is required');
    }

    info = info || {};

    this._appInfo = info;
  }

  private _setApiField(key: string, val: any) {
    return getKeyValue(this._api)(val);
  }

  private _getApiField(key: any) {
    return getKeyValue(this._api)(key);
  }

  private _setApiKey(key: string) {
    if (key) {
      this._setApiField('auth', `Bearer ${key}`);
    }
  }
}

export default EduDash.EduDash;
