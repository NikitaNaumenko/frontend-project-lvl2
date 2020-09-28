import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import fs from 'fs';
import genDiff from '../index';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* eslint-enable no-underscore-dangle */

test('generate flat json diff', () => {
  const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'first_file.json');
  const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'second_file.json');
  const resultPath = path.resolve(__dirname, '..', '__fixtures__', 'result');

  const result = fs.readFileSync(resultPath, 'utf8');

  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
