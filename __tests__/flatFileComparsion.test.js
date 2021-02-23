import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import flatFileComparsion from '../files/flatFileComparsion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// eslint-disable-next-line no-undef
test('flatFileComparsion', () => {
  // eslint-disable-next-line no-undef
  expect(flatFileComparsion(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual('{"- follow":false,"  host":"hexlet.io","- proxy":"123.234.53.22","- timeout":50,"+ timeout":20,"+ verbose":true}');
});
