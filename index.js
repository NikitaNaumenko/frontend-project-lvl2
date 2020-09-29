import path from 'path';
import fs from 'fs';
import findParser from './src/parsers';
import buildAST from './src/buildAST';

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
  const extension = path.extname(firstFilePath);

  const parseContent = findParser(extension);
  const data1 = parseContent(firstFileContent);
  const data2 = parseContent(secondFileContent);
  const ast = buildAST(data1, data2);

  return renderAST(ast);
};

export default genDiff;
