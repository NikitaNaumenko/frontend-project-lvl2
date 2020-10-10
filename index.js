import path from 'path';
import fs from 'fs';
import parse from './src/parse.js';
import buildAST from './src/buildAST.js';
import render from './src/formatters/index.js';

const resolvePath = (filepath) => path.resolve(filepath);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const firstFilePath = resolvePath(filepath1);
  const secondFilePath = resolvePath(filepath2);
  const firstFileContent = readFile(firstFilePath);
  const secondFileContent = readFile(secondFilePath);

  const data1 = parse(firstFileContent, firstFilePath);
  const data2 = parse(secondFileContent, secondFilePath);
  const ast = buildAST(data1, data2);

  return render(ast, format);
};

export default genDiff;
