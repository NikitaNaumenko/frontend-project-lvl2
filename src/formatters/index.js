import stylish from './stylish.js';
import plain from './plain.js';

const formattersFunctionsByFormats = {
  stylish,
  plain,
  json: JSON.stringify,
};

const render = (ast, format) => {
  const formatterFunc = formattersFunctionsByFormats[format];
  if (!formatterFunc) {
    throw new Error('Wrong format, correct formats only: stylsish, plain, json.');
  }
  return formatterFunc(ast);
};

export default render;
