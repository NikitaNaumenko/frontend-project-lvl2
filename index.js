import path from 'path';
import fs from 'fs';
import parse from './src/parse';
import buildAST from './src/buildAST';
import render from './src/formatters';
// import util from 'util';

const resolvePath = (filepath) => path.resolve(filepath);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const genDiff = (filepath1, filepath2, format) => {
  const firstFilePath = resolvePath(filepath1);
  const secondFilePath = resolvePath(filepath2);
  const firstFileContent = readFile(firstFilePath);
  const secondFileContent = readFile(secondFilePath);

  const data1 = parse(firstFileContent, firstFilePath);
  const data2 = parse(secondFileContent, secondFilePath);
  const ast = buildAST(data1, data2);

  // console.log(util.inspect(ast,  false, null, true))

  return render(ast, format);
};

export default genDiff;
