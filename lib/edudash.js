const {
  DEFAULT_HOST,
  DEFAULT_PORT,
  DEFAULT_BASE_PATH,
  DEFAULT_API_VERSION,
  DEFAULT_TIMEOUT,
} = require('./constants');
const resources = require('./resources');

EduDash.PACKAGE_VERSION = require('../package.json').version;

EduDash.USER_AGENT = {
  bindings_version: EduDash.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'edudash',
  uname: null,
  typescript: false,
};

EduDash.USER_AGENT_SERIALIZED = null;

const MAX_NETWORK_RETRY_DELAY_SEC = 2;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;

const APP_INFO_PROPERTIES = ['name', 'version', 'url'];

const ALLOWED_CONFIG_PROPERTIES = [
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

const EventEmitter = require('events').EventEmitter;

EduDash.resources = resources;

function EduDash(key, config = {}) {
  if (!(this instanceof EduDash)) {
    return new EduDash(key, config);
  }

  const props = this._getPropsFromConfig(config);

  Object.defineProperty(this, '_emitter', {
    value: new EventEmitter(),
    enumerable: false,
    configurable: false,
    writable: false,
  });

  this.VERSION = EduDash.PACKAGE_VERSION;

  this.on = this._emitter.on.bind(this._emitter);
  this.once = this._emitter.once.bind(this._emitter);
  this.off = this._emitter.removeListener.bind(this._emitter);

  this._api = {
    auth: null,
    host: props.host || DEFAULT_HOST,
    port: props.port || DEFAULT_PORT,
    protocol: props.protocol || 'https',
    basePath: DEFAULT_BASE_PATH,
    version: props.apiVersion || DEFAULT_API_VERSION,
    timeout: props.timeout || DEFAULT_TIMEOUT,
    maxNetworkRetries: props.maxNetworkRetries || 0,
    agent: props.httpAgent || null,
    dev: props.dev || false,
  };

  const typescript = props.typescript || false;
  if (typescript !== EduDash.USER_AGENT.typescript) {
    EduDash.USER_AGENT_SERIALIZED = null;
    EduDash.USER_AGENT.typescript = typescript;
  }
}

EduDash.prototype = {
  /**
   * @private
   */
  _setApiKey(key) {},

  _setAppInfo(info) {
    if (info && typeof info !== 'object') {
      throw new Error('AppInfo must be an object');
    }
    if (info && !info.name) {
      throw new Error('AppInfo.name is required');
    }

    info = info || {};

    const appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
      if (typeof info[prop] == 'string') {
        accum = accum || {};
        accum[prop] = info[prop];
      }
      return accum;
    }, undefined);
  },

  /**
   * @private
   */
  _setApiField(key, value) {
    this._api[key] = value;
  },

  /**
   * @private
   */
  getApiField(key) {
    return this._api[key];
  },

  setClientId(clientId) {
    this._clientId = clientId;
  },

  getClientId() {
    return this._clientId;
  },

  getMaxNetworkRetries() {
    return this.getApiField('maxNetworkRetries');
  },

  setMaxNetworkRetries(maxNetworkRetries) {
    this._setApiNumberField('maxNetworkRetries', maxNetworkRetries);
  },

  /**
   * @private
   */
  _setApiNumberField(prop, n, defaultVal) {
    const val = n || defaultVal;
    this._setApiField(prop, val);
  },

  getMaxNetworkRetryDelay() {
    return MAX_NETWORK_RETRY_DELAY_SEC;
  },

  getInitialNetworkRetryDelay() {
    return INITIAL_NETWORK_RETRY_DELAY_SEC;
  },

  /**
   * @private
   */
  getClientUserAgent(cb) {
    if (EduDash.USER_AGENT_SERIALIZED) {
      return cb(EduDash.USER_AGENT_SERIALIZED);
    }
    this.getClientUserAgentSeeded(EduDash.USER_AGENT, (cua) => {
      EduDash.USER_AGENT_SERIALIZED = cua;
      cb(EduDash.USER_AGENT_SERIALIZED);
    });
  },

  /**
   * @private
   */
  getClientUserAgentSeeded(seed, cb) {
    return 0; /// TODO
  },

  /**
   * @private
   */
  getAppInfoAsString() {
    if (!this._appInfo) {
      return '';
    }

    let formatted = this._appInfo.name;

    if (this._appInfo.version) {
      formatted += `/${this._appInfo.version}`;
    }

    if (this._appInfo.url) {
      formatted += ` (${this._appInfo.url})`;
    }

    return formatted;
  },

  getTelemetryEnabled() {
    return this._enableTelemetry;
  },

  /**
   * @private
   */
  _prepResources() {
    for (const name in resources) {
      this[name] = new resources[name](this);
    }
  },

  /**
   * @private
   */
  _getPropsFromConfig(config) {
    if (!config) {
      return {};
    }

    const isString = typeof config === 'string';
    const isObject = config === Object(config) && !Array.isArray(config);

    if (!isObject && !isString) {
      throw new Error(`Config must either be an object or a string.`);
    }

    if (isString) {
      return {
        apiVersion: config,
      };
    }

    const values = Object.keys(config).filter(
      (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)
    );

    if (values.length > 0) {
      throw new Error(
        `Config may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(
          ', '
        )}.`
      );
    }

    return config;
  },
};

module.exports = EduDash;

module.exports.EduDash = EduDash;

module.exports.default = EduDash;
