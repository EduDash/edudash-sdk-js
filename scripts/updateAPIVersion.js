const fs = require('fs');
const path = require('path');

const readFile = (file) => fs.readFileSync(path.resolve(file)).toString();
const writeFile = (file, str) => fs.writeFileSync(path.resolve(file), str);
const editFile = (file, cb) => writeFile(file, cb(readFile(file)));

const API_VERSION = '2[0-9][2-9][1-9]-[0-9]{2}-[0-9]{2}';

const main = () => {
  const apiVersion = readFile('API_VERSION').trim();

  const replaceVersion = (file, pattern) => {
    editFile(file, (text) => {
      const parts = pattern.split('API_VERSION');
      return text.replace(
        new RegExp(parts.map((x) => `(${x})`).join(API_VERSION), 'g'),
        parts.length === 0
          ? apiVersion
          : parts.length === 1
          ? `$1${apiVersion}`
          : parts.length === 2
          ? `$1${apiVersion}$2`
          : 'UNEXPECTED'
      );
    });
  };

  replaceVersion('README.md', 'apiVersion: [\'"]API_VERSION[\'"]');
  replaceVersion('package.json', '"types": "types/API_VERSION/index.d.ts"');
  replaceVersion(
    'types/lib.d.ts',
    'export type LatestApiVersion = [\'"]API_VERSION[\'"]'
  );
};

if (require.main === module) {
  main();
}
