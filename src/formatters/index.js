import stylish from './stylish';

const funcByFormats = {
  stylish,
};

const render = (ast, format) => {
  const func = funcByFormats[format];
  return func(ast);
};

export default render;
