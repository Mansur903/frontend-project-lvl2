import _ from 'lodash';

/* const obj1 = {
  common: {
    setting1: 'Value 1',
    setting6: {
      key: 'value1',
      doge: {
        wow: '',
      },
    },
  },
  group: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};
const obj2 = {
  common: {
    setting1: 'Value 2',
    setting6: {
      key: 'value2',
    },
  },
  group1: {
    deep: {
      id: 46,
    },
  },
  group2: 'Value 3',
}; */
const obj3 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};
const obj4 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: 'null',
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const makeStringFromObject = (value, replacer = '  ', spacesCount = 1, mainDepth) => {
  const defaultIndent = 1;
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize + mainDepth + defaultIndent);
    const bracketIndent = replacer.repeat(indentSize - spacesCount + mainDepth);
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

function stringifyAstTree(data) {
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
console.log(stringifyAstTree(buildAstTree(obj3, obj4, [], 0)));
// console.log(buildAstTree(obj3, obj4, [], 0));
