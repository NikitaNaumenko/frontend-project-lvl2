import stylish from './stylish.js';
import plain from './plain.js';

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
