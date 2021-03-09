import _ from 'lodash';
import chooseParseFormat from './parsers.js';

const makeStringFromObject = (value, replacer = '  ', spacesCount = 1, mainDepth) => {
  const defaultIndent = 1;
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      if (currentValue === null) return 'null';
      return currentValue.toString();
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize + mainDepth + defaultIndent);
    const bracketIndent = replacer.repeat(indentSize - spacesCount + mainDepth + defaultIndent);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

function getDataInfo(item, depthValue, sign, valueInfo) {
  return {
    name: item, depth: depthValue, status: sign, value: valueInfo,
  };
}

function bothKeysAreObjects(val1, val2) {
  let result;
  if (_.isObject(val1) && _.isObject(val2)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export default function stylish(data) {
  const defIndient = 1;
  let string = '{\n';
  data.map((item) => {
    if (item.value === '}\n') {
      string += `${'  '.repeat(item.depth + defIndient)}${item.value}`;
    }
    if (item.value === 'obj') {
      string += `${'  '.repeat(item.depth)}${item.status}${item.name}: {\n`;
    }
    if (item.value !== 'obj' && item.value !== '}\n') {
      string += `${'  '.repeat(item.depth)}${item.status}${item.name}: ${item.value}\n`;
    }
    return string;
  });
  return `${string}`;
}

function buildAstTree(data1, data2, data, depth = 0) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonSortedKeys = _.sortBy(_.uniq(_.concat(keys1, keys2)));
  commonSortedKeys.map((item) => {
    const val1 = data1[item];
    const val2 = data2[item];
    if (keys1.includes(item) && keys2.includes(item) && bothKeysAreObjects(val1, val2)) {
      if (val1 === val2) {
        data.push(getDataInfo(item, depth, '  ', makeStringFromObject(val1, '  ', 1, depth)));
      } else {
        data.push(getDataInfo(item, depth, '  ', 'obj'));
        const nextDepth = depth + 1;
        buildAstTree(val1, val2, data, nextDepth);
        data.push(getDataInfo(item, depth, '  ', '}\n'));
      }
      return;
    }
    if (keys1.includes(item) && keys2.includes(item) && !bothKeysAreObjects(val1, val2)) {
      if (val1 === val2) {
        data.push(getDataInfo(item, depth, '  ', val1));
      } else {
        data.push(getDataInfo(item, depth, '- ', makeStringFromObject(val1, '  ', 1, depth)));
        data.push(getDataInfo(item, depth, '+ ', makeStringFromObject(val2, '  ', 1, depth)));
      }
      return;
    }
    if (keys1.includes(item) && _.isObject(val1)) {
      data.push(getDataInfo(item, depth, '- ', makeStringFromObject(val1, '  ', 1, depth)));
      return;
    }
    if (keys1.includes(item) && !_.isObject(val1)) {
      data.push(getDataInfo(item, depth, '- ', val1));
      return;
    }
    if (keys2.includes(item) && _.isObject(val2)) {
      data.push(getDataInfo(item, depth, '+ ', makeStringFromObject(val2, '  ', 1, depth)));
      return;
    }
    if (keys2.includes(item) && !_.isObject(val2)) {
      data.push(getDataInfo(item, depth, '+ ', val2));
    }
    // eslint-disable-next-line no-useless-return
    return;
  });
  return data;
}
const makeComparsion = (data1, data2) => `${stylish(buildAstTree(data1, data2, [], 0))}}`;

export function fileComparsion(filepath1, filepath2) {
  const dataOfFile1 = chooseParseFormat(filepath1);
  const dataOfFile2 = chooseParseFormat(filepath2);
  console.log(makeComparsion(dataOfFile1, dataOfFile2));
  return makeComparsion(dataOfFile1, dataOfFile2);
}
