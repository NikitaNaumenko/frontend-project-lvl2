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
  ['json', 'stylish'], ['yaml', 'stylish'], ['ini', 'stylish'],
  ['json', 'plain'], ['yaml', 'plain'], ['ini', 'plain'],
  // ['json', 'json'], ['yaml', 'json'], ['ini', 'json']
])(
  '%s', (type, format) => {
    const before = resolvePath(`before.${type}`);
    const after = resolvePath(`after.${type}`);
    const actual = genDiff(before, after, format);
    const expected = readFile(resolvePath(format), 'utf-8');
    expect(actual).toEqual(expected);
  },
);
