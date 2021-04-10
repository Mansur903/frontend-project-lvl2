import _ from 'lodash';
// import stylish from '../formatters/stylish.js';
// import plain from '../formatters/plain.js';
import chooseParseFormat from './parsers.js';
import chooseFormat from '../formatters/index.js';

function bothKeysAreObjects(val1, val2) {
  if (_.isObject(val1) && _.isObject(val2)) return true;
  return false;
}
function includesInBoth(keys1, keys2, item) {
  if (_.includes(keys1, item) && _.includes(keys2, item)) return true;
  return false;
}

const keyTypes = [
  {
    status: 'added',
    condition: (data1, data2, name) => {
      const keys1 = Object.keys(data1);
      const keys2 = Object.keys(data2);
      if (!_.includes(keys1, name) && _.includes(keys2, name)) return true;
      return false;
    },
  },
  {
    status: 'removed',
    condition: (data1, data2, name) => {
      const keys1 = Object.keys(data1);
      const keys2 = Object.keys(data2);
      if (_.includes(keys1, name) && !_.includes(keys2, name)) return true;
      return false;
    },
  },
  {
    status: 'changed',
    condition: (data1, data2, name) => {
      const keys1 = Object.keys(data1);
      const keys2 = Object.keys(data2);
      if (data1[name] !== data2[name] && includesInBoth(keys1, keys2, name)
      && !bothKeysAreObjects(data1[name], data2[name])) {
        return true;
      }
      return false;
    },
  },
  {
    status: 'unchanged',
    condition: (data1, data2, name) => {
      const keys1 = Object.keys(data1);
      const keys2 = Object.keys(data2);
      if (data1[name] === data2[name] && includesInBoth(keys1, keys2, name)) {
        return true;
      }
      return false;
    },
  },
  {
    status: 'bothObjects',
    condition: (data1, data2, name) => {
      if (bothKeysAreObjects(data1[name], data2[name])) return true;
      return false;
    },
  },
];
function genTree(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonSortedKeys = _.sortBy(_.uniq(_.concat(keys1, keys2)));
  const result = commonSortedKeys.map((name) => {
    const { status } = _.find(keyTypes, (elem) => elem.condition(data1, data2, name));
    const values = (firstData, secondData) => {
      if (status === 'added') {
        return { value: secondData[name] };
      }
      if (status === 'removed') {
        return { value: firstData[name] };
      }
      if (status === 'changed') {
        return {
          oldValue: firstData[name],
          newValue: secondData[name],
        };
      }
      if (status === 'unchanged') {
        return { value: firstData[name] };
      }
      return { children: genTree(firstData[name], secondData[name]) };
    };
    const valuesResult = values(data1, data2);
    return {
      name,
      status,
      ...valuesResult,
    };
  });
  return result;
}

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const dataOfFile1 = chooseParseFormat(filepath1);
  const dataOfFile2 = chooseParseFormat(filepath2);
  const generatedTree = genTree(dataOfFile1, dataOfFile2);
  return chooseFormat(formatName, generatedTree);
  // return null;
}