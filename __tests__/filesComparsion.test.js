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

test('fileComparsionStylish', () => {
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.json')))
    .toEqual(stylishResult);
  expect(genDiff(getFixturePath('file1deep.yaml'), getFixturePath('file2deep.yaml')))
    .toEqual(stylishResult);
});
test('fileComparsionPlain', () => {
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.yaml'), 'plain'))
    .toEqual(plainResult);
});
test('fileComparsionJSON', () => {
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.json'), 'json'))
    .toEqual(jsonResult);
});
