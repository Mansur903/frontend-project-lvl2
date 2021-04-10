import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../files/genTree.js';
import comparsionResult, { comparsionResultPlain, comparsionResultJSON } from '../__fixtures__/comparsionResults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('fileComparsionStylish', () => {
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.json')))
    .toEqual(comparsionResult);
  expect(genDiff(getFixturePath('file1deep.yaml'), getFixturePath('file2deep.yaml')))
    .toEqual(comparsionResult);
});
test('fileComparsionPlain', () => {
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.yaml'), 'plain'))
    .toEqual(comparsionResultPlain);
});
test('fileComparsionJSON', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))
    .toEqual(comparsionResultJSON);
});
