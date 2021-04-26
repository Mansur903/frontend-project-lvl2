import _ from 'lodash';

function bothKeysAreObjects(val1, val2) {
  if (_.isObject(val1) && _.isObject(val2)) return true;
  return false;
}
function includesInBoth(keys1, keys2, item) {
  if (_.includes(keys1, item) && _.includes(keys2, item)) return true;
  return false;
}

export default function genTree(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonSortedKeys = _.sortBy(_.uniq(_.concat(keys1, keys2)));
  const getStatus = (name) => {
    if (!_.includes(keys1, name) && _.includes(keys2, name)) {
      return 'added';
    }
    if (_.includes(keys1, name) && !_.includes(keys2, name)) {
      return 'removed';
    }
    if (data1[name] !== data2[name] && includesInBoth(keys1, keys2, name)
    && !bothKeysAreObjects(data1[name], data2[name])) {
      return 'changed';
    }
    if (data1[name] === data2[name] && includesInBoth(keys1, keys2, name)) {
      return 'unchanged';
    }
    if (bothKeysAreObjects(data1[name], data2[name])) {
      return 'bothObjects';
    }
    return null;
  };
  const result = commonSortedKeys.map((name) => {
    const status = getStatus(name);
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
