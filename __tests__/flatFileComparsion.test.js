import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fileComparsion from '../files/deepFileComparsion.js';
import comparsionResult
  from '../__fixtures__/comparsionResults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// eslint-disable-next-line no-undef
test('flatFileComparsion', () => {
  // eslint-disable-next-line no-undef
  expect(fileComparsion(getFixturePath('file1deep.json'), getFixturePath('file2deep.json')))
    .toEqual(comparsionResult);
  // eslint-disable-next-line no-undef
  expect(fileComparsion(getFixturePath('file1deep.yaml'), getFixturePath('file2deep.yaml')))
    .toEqual(comparsionResult);
});
