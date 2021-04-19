const makeStringFromObject = (value, replacer = ' ', spacesCount = 1, curDepth) => {
  const defaultIndent = 4;
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      if (currentValue === null || currentValue === undefined) return 'null';
      return currentValue.toString();
    }
    const indentSize = depth * 4 * spacesCount;
    const currentIndent = replacer.repeat(indentSize + defaultIndent);
    const bracketIndent = replacer.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, curDepth);
};

const separator = ' ';
const spacesCount = 1;

export default function stylish(data) {
  function wrapper(thisData, depth) {
    const result = thisData.map((item) => {
      if (item.status === 'bothObjects') {
        const newDepth = depth + 1;
        if (depth === 1) {
          return (`${separator.repeat(depth + 3)}${item.name}: {\n${wrapper(item.children, newDepth)}\n${separator.repeat(depth * 4)}}`);
        }
        return (`${separator.repeat(depth * 4 - 2)}  ${item.name}: {\n${wrapper(item.children, newDepth)}\n${separator.repeat(depth * 4)}}`);
      }
      if (item.status === 'added') {
        return (`${separator.repeat(depth * 4 - 2)}+ ${item.name}: ${makeStringFromObject(item.value, separator, spacesCount, depth)}`);
      }
      if (item.status === 'removed') {
        return (`${separator.repeat(depth * 4 - 2)}- ${item.name}: ${makeStringFromObject(item.value, separator, spacesCount, depth)}`);
      }
      if (item.status === 'changed') {
        return (`${separator.repeat(depth * 4 - 2)}- ${item.name}: ${makeStringFromObject(item.oldValue, separator, spacesCount, depth)}\n${separator.repeat(depth * 4 - 2)}+ ${item.name}: ${makeStringFromObject(item.newValue, separator, spacesCount, depth)}`);
      }
      if (item.status === 'unchanged') {
        return (`${separator.repeat(depth * 4 - 2)}  ${item.name}: ${makeStringFromObject(item.value, separator, spacesCount, depth)}`);
      }
      return null;
    }).join('\n');
    return result;
  }
  const result = wrapper(data, 1);
  return `{\n${result}\n}`;
}
