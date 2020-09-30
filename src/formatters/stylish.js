import _ from 'lodash';

const makeIndent = (level) => '  '.repeat(level);

const stringify = (object, depth) => {
  if (!_.isObject(object)) {
    return object;
  }
  const openingSpaces = makeIndent(depth + 2);
  const closingSpaces = makeIndent(depth + 1);
  const allKeys = _.keys(object);
  return `{\n${allKeys
    .map((key) => `${openingSpaces}  ${key}: ${_.isObject(object[key]) ? stringify(object[key], depth + 2) : object[key]}`)
    .join('\n')}\n${closingSpaces}}`;
};

const nodeTypesForRender = {
  nest: ({ key, children }, level, func) => (
    `${makeIndent(level)}  ${key}: {\n${func(children, level + 2)}\n${makeIndent(level + 1)}}`
  ),
  deleted: ({ key, valueBefore }, level) => (
    `${makeIndent(level)}- ${key}: ${stringify(valueBefore, level)}`
  ),
  added: ({ key, valueAfter }, level) => (
    `${makeIndent(level)}+ ${key}: ${stringify(valueAfter, level)}`
  ),
  changed: ({ key, valueBefore, valueAfter }, level) => (
    `${makeIndent(level)}- ${key}: ${stringify(valueBefore, level)}\n${makeIndent(level)}+ ${key}: ${stringify(valueAfter, level)}`
  ),
  unchanged: ({ key, valueBefore }, level) => (
    `${makeIndent(level)}  ${key}: ${stringify(valueBefore, level)}`
  ),
};

const render = (ast, level = 1) => {
  const result = ast.flatMap((node) => {
    const { type } = node;
    const renderNodeFunc = nodeTypesForRender[type];
    return renderNodeFunc(node, level, render);
  });

  return result.join('\n');
};

export default (ast) => `{\n${render(ast)}\n}`;
