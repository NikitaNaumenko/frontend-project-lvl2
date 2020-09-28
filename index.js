import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const types = [
  {
    type: 'changed',
    check: (key, data1, data2) => (
      _.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]
    ),
    process: (key, data1, data2) => ({
      key, valueBefore: data1[key], valueAfter: data2[key], type: 'changed',
    }),
  },
  {
    type: 'unchanged',
    check: (key, data1, data2) => _.has(data1, key) && _.has(data2, key),
    process: (key, data1) => ({ key, valueBefore: data1[key], type: 'unchanged' }),
  },
  {
    type: 'added',
    check: (key, data1, data2) => !_.has(data1, key) && _.has(data2, key),
    process: (key, _data1, data2) => ({ key, valueAfter: data2[key], type: 'added' }),
  },
  {
    type: 'deleted',
    check: (key, data1, data2) => _.has(data1, key) && !_.has(data2, key),
    process: (key, data1) => ({ key, valueBefore: data1[key], type: 'deleted' }),
  },
];

const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.reduce((acc, key) => {
    const { process } = types.find(({ check }) => check(key, data1, data2));
    return [...acc, process(key, data1, data2)];
  }, []);
};

const renderAST = (ast) => {
  const valueByType = {
    changed: ({ key, valueBefore, valueAfter }) => (`  - ${key}: ${valueBefore}\n  + ${key}: ${valueAfter}`),
    unchanged: ({ key, valueBefore }) => (`    ${key}: ${valueBefore}`),
    added: ({ key, valueAfter }) => (`  + ${key}: ${valueAfter}`),
    deleted: ({ key, valueBefore }) => (`  - ${key}: ${valueBefore}`),
  };

  const processedAST = ast.reduce((acc, node) => {
    const valueFunc = valueByType[node.type];
    const value = valueFunc(node);
    return [...acc, value];
  }, []);

  return `{\n${processedAST.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const firstFilePath = path.resolve(filepath1);
  const secondFilePath = path.resolve(filepath2);

  const firstFileContent = fs.readFileSync(firstFilePath, 'utf8');
  const secondFileContent = fs.readFileSync(secondFilePath, 'utf8');
  const data1 = JSON.parse(firstFileContent);
  const data2 = JSON.parse(secondFileContent);
  const ast = buildAST(data1, data2);

  return renderAST(ast);
};

export default genDiff;
