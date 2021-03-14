import { makeComparsionStylish, makeComparsionPlain } from '../files/fileComparsion.js';

export default function selectFormat(data1, data2, formatName = 'stylish') {
  let selectedFormat;
  if (formatName === 'stylish') {
    console.log(makeComparsionStylish(data1, data2));
    selectedFormat = makeComparsionStylish(data1, data2);
  }
  if (formatName === 'plain') {
    console.log(makeComparsionPlain(data1, data2));
    selectedFormat = makeComparsionPlain(data1, data2);
  }
  return selectedFormat;
}
