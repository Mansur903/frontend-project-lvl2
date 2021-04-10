import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default function chooseFormat(formatName, data) {
  const formats = { stylish, plain, json };
  const makeFormat = formats[formatName];
  return makeFormat(data);
}
