import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishResult = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const jsonResult = fs.readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');

const pathBeforeJson = getFixturePath('file1deep.json');
const pathAfterJson = getFixturePath('file2deep.json');
const pathBeforeYml = getFixturePath('file1deep.yml');
const pathAfterYml = getFixturePath('file2deep.yml');

test.each([
  [genDiff(pathBeforeJson, pathAfterJson)],
  [genDiff(pathBeforeYml, pathAfterYml)],
])('fileComparsionResult', (expectedResult) => {
  expect(expectedResult).toEqual(stylishResult);
});

test('fileComparsionPlain', () => {
  expect(genDiff(pathBeforeJson, pathAfterJson, 'plain')).toEqual(plainResult);
});
test('fileComparsionJSON', () => {
  expect(genDiff(pathBeforeYml, pathAfterYml, 'json')).toEqual(jsonResult);
});
