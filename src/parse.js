import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parseFuncByExtenstion = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParseFunc = (filepath) => {
  const extension = path.extname(filepath);

  return parseFuncByExtenstion[extension];
};

const parse = (content, filepath) => {
  const parseFunc = getParseFunc(filepath);

  return parseFunc(content);
};

export default parse;
