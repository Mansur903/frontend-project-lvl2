import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { fileComparsion } from '../files/fileComparsion.js';
import comparsionResult, { comparsionResultPlain } from '../__fixtures__/comparsionResults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// eslint-disable-next-line no-undef
test('fileComparsion', () => {
  // eslint-disable-next-line no-undef
  expect(fileComparsion(getFixturePath('file1deep.json'), getFixturePath('file2deep.json')))
    .toEqual(comparsionResult);
  // eslint-disable-next-line no-undef
  expect(fileComparsion(getFixturePath('file1deep.yaml'), getFixturePath('file2deep.yaml')))
    .toEqual(comparsionResult);
});
// eslint-disable-next-line no-undef
test('fileCOmparsionPlain', () => {
  // eslint-disable-next-line no-undef
  expect(fileComparsion(getFixturePath('file1deep.json'), getFixturePath('file2deep.yaml')))
    .toEqual(comparsionResultPlain);
});
