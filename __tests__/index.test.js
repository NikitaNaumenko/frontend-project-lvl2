import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import fs from 'fs';
import genDiff from '../index';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* eslint-enable no-underscore-dangle */

const resolvePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

test.each([
  ['json', 'stylish'], ['yml', 'stylish'], ['ini', 'stylish'],
  ['json', 'plain'], ['yml', 'plain'], ['ini', 'plain'],
  ['json', 'json'], ['yml', 'json'], ['ini', 'json'],
])(
  '%s %s', (type, format) => {
    const before = resolvePath(`file1.${type}`);
    const after = resolvePath(`file2.${type}`);
    const actual = genDiff(before, after, format);
    const expected = readFile(resolvePath(`result_${format}.txt`), 'utf-8');
    expect(actual).toEqual(expected);
  },
);

test.each(['json', 'yml', 'ini'])(
  '%s default stylish', (type) => {
    const before = resolvePath(`file1.${type}`);
    const after = resolvePath(`file2.${type}`);
    const actual = genDiff(before, after);
    const expected = readFile(resolvePath('result_stylish.txt'), 'utf-8');
    expect(actual).toEqual(expected);
  },
);

test.each([['json', 'wrongFormat'], ['yml', 'wrongFormat'], ['ini', 'wrongFormat']])(
  '%s %s', (type, format) => {
    const before = resolvePath(`file1.${type}`);
    const after = resolvePath(`file2.${type}`);
    expect(() => genDiff(before, after, format)).toThrow(/Wrong format/);
  },
);
