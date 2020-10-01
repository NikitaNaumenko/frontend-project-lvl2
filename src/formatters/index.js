import stylish from './stylish';
import plain from './plain';

const funcByFormats = {
  stylish,
  plain,
  json: JSON.stringify,
};

const render = (ast, format) => {
  const func = funcByFormats[format];
  return func(ast);
};

export default render;
