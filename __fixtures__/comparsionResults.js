const comparsionResult = `{
  common: {
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: null
  + setting4: blah blah
  + setting5: {
      key5: value5
    }
    setting6: {
      doge: {
      - wow: 
      + wow: so much
      }
      key: value
    + ops: vops
    }
  }
  group1: {
  - baz: bas
  + baz: bars
    foo: bar
  - nest: {
      key: value
    }
  + nest: str
  }
- group2: {
    abc: 12345
    deep: {
      id: 45
    }
  }
+ group3: {
    deep: {
      id: {
        number: 45
      }
    }
    fee: 100500
  }
}`;
export default comparsionResult;

export const comparsionResultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

export const comparsionResultJSON = [
  {
    name: 'common', depth: 0, status: '  ', value: 'obj',
  },
  {
    name: 'follow', depth: 1, status: '+ ', value: false,
  },
  {
    name: 'setting1', depth: 1, status: '  ', value: 'Value 1',
  },
  {
    name: 'setting2', depth: 1, status: '- ', value: 200,
  },
  {
    name: 'setting3', depth: 1, status: '- ', value: true,
  },
  {
    name: 'setting3', depth: 1, status: '+ ', value: null,
  },
  {
    name: 'setting4', depth: 1, status: '+ ', value: 'blah blah',
  },
  {
    name: 'setting5',
    depth: 1,
    status: '+ ',
    value: '{\n      key5: value5\n    }',
  },
  {
    name: 'setting6', depth: 1, status: '  ', value: 'obj',
  },
  {
    name: 'doge', depth: 2, status: '  ', value: 'obj',
  },
  {
    name: 'wow', depth: 3, status: '- ', value: '',
  },
  {
    name: 'wow', depth: 3, status: '+ ', value: 'so much',
  },
  {
    name: 'doge', depth: 2, status: '  ', value: '}\n',
  },
  {
    name: 'key', depth: 2, status: '  ', value: 'value',
  },
  {
    name: 'ops', depth: 2, status: '+ ', value: 'vops',
  },
  {
    name: 'setting6', depth: 1, status: '  ', value: '}\n',
  },
  {
    name: 'common', depth: 0, status: '  ', value: '}\n',
  },
  {
    name: 'group1', depth: 0, status: '  ', value: 'obj',
  },
  {
    name: 'baz', depth: 1, status: '- ', value: 'bas',
  },
  {
    name: 'baz', depth: 1, status: '+ ', value: 'bars',
  },
  {
    name: 'foo', depth: 1, status: '  ', value: 'bar',
  },
  {
    name: 'nest',
    depth: 1,
    status: '- ',
    value: '{\n      key: value\n    }',
  },
  {
    name: 'nest', depth: 1, status: '+ ', value: 'str',
  },
  {
    name: 'group1', depth: 0, status: '  ', value: '}\n',
  },
  {
    name: 'group2',
    depth: 0,
    status: '- ',
    value: '{\n    abc: 12345\n    deep: {\n      id: 45\n    }\n  }',
  },
  {
    name: 'group3',
    depth: 0,
    status: '+ ',
    value: '{\n'
      + '    deep: {\n'
      + '      id: {\n'
      + '        number: 45\n'
      + '      }\n'
      + '    }\n'
      + '    fee: 100500\n'
      + '  }',
  },
];
