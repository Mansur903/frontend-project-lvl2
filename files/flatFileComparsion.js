import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

export default function flatFileComparsion(filepath1, filepath2) {
  const dataOfFile1 = JSON.parse(readFileSync(path.resolve(`${process.cwd()}`, `${filepath1}`), 'utf-8'));
  const dataOfFile2 = JSON.parse(readFileSync(path.resolve(`${process.cwd()}`, `${filepath2}`), 'utf-8'));
  const keysOfFile1 = Object.keys(dataOfFile1);
  const keysOfFile2 = Object.keys(dataOfFile2);
  const commonSortedKeys = _.sortBy(_.uniq(_.concat(keysOfFile1, keysOfFile2)));
  const result = commonSortedKeys.reduce((acc, item) => {
    const keyWithMinus = `- ${item}`;
    const keyWithPlus = `+ ${item}`;
    const keyWithSpaces = `  ${item}`;
    if (keysOfFile1.includes(item)) {
      if (keysOfFile2.includes(item)) {
        if (dataOfFile1[item] === dataOfFile2[item]) {
          acc[keyWithSpaces] = dataOfFile1[item];
        } else {
          acc[keyWithMinus] = dataOfFile1[item];
          acc[keyWithPlus] = dataOfFile2[item];
        }
      } else {
        acc[keyWithMinus] = dataOfFile1[item];
      }
    } else if (keysOfFile2.includes(item)) acc[keyWithPlus] = dataOfFile2[item];
    return acc;
  }, {});
  console.log(result);
  return JSON.stringify(result);
}
