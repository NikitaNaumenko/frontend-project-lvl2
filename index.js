import path from 'path';
import fs from 'fs';
import parse from './src/parse.js';
import buildAST from './src/buildAST.js';
import render from './src/formatters/index.js';

const resolvePath = (filepath) => path.resolve(filepath);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const getFileExtension = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const firstFilePath = resolvePath(filepath1);
  const secondFilePath = resolvePath(filepath2);
  const firstFileContent = readFile(firstFilePath);
  const secondFileContent = readFile(secondFilePath);

  const firstFileExtension = getFileExtension(firstFilePath);
  const secondFileExtension = getFileExtension(secondFilePath);
  const data1 = parse(firstFileContent, firstFileExtension);
  const data2 = parse(secondFileContent, secondFileExtension);
  const ast = buildAST(data1, data2);

  return render(ast, format);
};

export default genDiff;
