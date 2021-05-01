import stylish from './stylish.js';
import plain from './plain.js';

export default function formateData(formatName, data) {
  const formats = { stylish, plain, json: JSON.stringify };
  return formats[formatName](data);
}
