const valuesByType = {
  object: () => '[complex value]',
  string: (value) => `'${value}'`,
  number: (value) => value,
  boolean: (value) => value,
};

const getValue = (value) => {
  const type = typeof value;
  const func = valuesByType[type];
  return func(value);
};

const nodeTypesForRender = {
  nest: ({ key, children }, path, func) => func(children, `${path}${key}.`),
  deleted: ({ key }, path) => `Property ${path}${key} was removed`,
  added: ({ key, valueAfter }, path) => (
    `Property ${path}${key} was added with value ${getValue(valueAfter)}`
  ),
  changed: ({ key, valueBefore, valueAfter }, path) => (
    `Property ${path}${key} was updated. From ${getValue(valueBefore)} to ${getValue(valueAfter)}`
  ),
  unchanged: () => null,
};

const render = (ast, path = '') => {
  const result = ast.flatMap((node) => {
    const { type } = node;
    const renderNodeFunc = nodeTypesForRender[type];
    return renderNodeFunc(node, path, render);
  });

  return result.filter((node) => node !== null).join('\n');
};

export default (ast) => render(ast);
