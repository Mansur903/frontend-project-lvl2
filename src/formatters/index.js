import stylish from './stylish.js';
import plain from './plain.js';

export default function formateData(formatName, data) {
  const formats = { stylish, plain, json: (item) => JSON.stringify(item) };
  const makeFormat = formats[formatName];
  return makeFormat(data);
}
