import yaml from 'js-yaml';
import ini from 'ini';

const parserByExtenstion = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const findParser = (extension) => parserByExtenstion[extension];

export default findParser;
