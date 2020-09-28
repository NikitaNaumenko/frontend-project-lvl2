import yaml from 'js-yaml';

const parserByExtenstion = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

const findParser = (extension) => parserByExtenstion[extension];

export default findParser;
