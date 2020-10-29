import yaml from 'js-yaml';
import ini from 'ini';

const parseFuncByType = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (content, type) => {
  const parseFunc = parseFuncByType[type];

  return parseFunc(content);
};

export default parse;
