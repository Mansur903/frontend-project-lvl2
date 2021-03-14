import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../files/fileComparsion.js';
import comparsionResult, { comparsionResultPlain, comparsionResultJSON } from '../__fixtures__/comparsionResults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// eslint-disable-next-line no-undef
test('fileComparsionStylish', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.json')))
    .toEqual(comparsionResult);
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1deep.yaml'), getFixturePath('file2deep.yaml')))
    .toEqual(comparsionResult);
});
// eslint-disable-next-line no-undef
test('fileComparsionPlain', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.yaml'), 'plain'))
    .toEqual(comparsionResultPlain);
});
// eslint-disable-next-line no-undef
test('fileComparsionJSON', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('file1deep.json'), getFixturePath('file2deep.json'), 'json'))
    .toEqual(comparsionResultJSON);
});
