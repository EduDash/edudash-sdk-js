exports.REST_VERSION : number = 1;
exports.GATEWAY_VERSION = 2;

exports.GatewayOPCodes = {
  EVENT: 0,
  HEARTBEAT: 1,
  HEARTBEAT_ACK: 2,
  IDENTIFY: 3,
};

exports.ALLOWED_CONF_PROPERTIES = [
  'apiVersion',
  'typescript',
  'maxNetworkRetries',
  'httpAgent',
  'timeout',
  'host',
  'port',
  'protocol',
  'telemetry',
  'appInfo'
];

exports.DEFAULT_HOST = 'api.edudash.org';
exports.DEFAULT_PORT = '443';
exports.DEFAULT_BASE_PATH = `/${exports.REST_VERSION}/`;
exports.DEFAULT_API_VERSION = null;
exports.DEFAULT_TIMEOUT = 80000;