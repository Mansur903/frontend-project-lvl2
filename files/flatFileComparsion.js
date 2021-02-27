import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

function parseJSON(filepath) {
  return JSON.parse(readFileSync(path.resolve(`${process.cwd()}`, `${filepath}`), 'utf-8'));
}

export default function flatFileComparsion(filepath1, filepath2) {
  const dataOfFile1 = parseJSON(filepath1);
  const dataOfFile2 = parseJSON(filepath2);
  const keysOfFile1 = Object.keys(dataOfFile1);
  const keysOfFile2 = Object.keys(dataOfFile2);
  const commonSortedKeys = _.sortBy(_.uniq(_.concat(keysOfFile1, keysOfFile2)));
  const result = commonSortedKeys.reduce((acc, item) => {
    if (keysOfFile1.includes(item)) {
      if (keysOfFile2.includes(item)) {
        if (dataOfFile1[item] === dataOfFile2[item]) {
          acc.push(`   ${item}: ${dataOfFile1[item]}`);
        } else {
          acc.push(` - ${item}: ${dataOfFile1[item]}`);
          acc.push(` + ${item}: ${dataOfFile2[item]}`);
        }
      } else {
        acc.push(` - ${item}: ${dataOfFile1[item]}`);
      }
    } else if (keysOfFile2.includes(item)) acc.push(` + ${item}: ${dataOfFile2[item]}`);
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
}
