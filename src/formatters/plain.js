function genPath(path, item) {
  const pathChain = [...path, item];
  return pathChain;
}

function stringify(item) {
  if (typeof item === 'object' && item !== null) return '[complex value]';
  if (typeof item === 'string') return `'${item}'`;
  return item;
}

function generateResult(type, path, firstValue, secondValue) {
  if (type === 'added') {
    return `Property '${path}' was added with value: ${firstValue}`;
  }
  if (type === 'removed') {
    return `Property '${path}' was removed`;
  }
  if (type === 'changed') {
    return `Property '${path}' was updated. From ${firstValue} to ${secondValue}`;
  }
  return null;
}

export default function plain(data) {
  function wrapper(thisData, path = []) {
    const thisPath = path;
    const onlyModifiedValues = thisData.filter((item) => item.status !== 'unchanged');
    const result = onlyModifiedValues.map((item) => {
      const generatedPath = genPath(thisPath, item.name);
      const resultPath = generatedPath.join('.');
      switch (item.status) {
        case 'added':
          return generateResult('added', resultPath, stringify(item.value));
        case 'removed':
          return generateResult('removed', resultPath);
        case 'changed':
          return generateResult('changed', resultPath, stringify(item.oldValue), stringify(item.newValue));
        case 'bothObjects':
          return wrapper(item.children, generatedPath);
        default:
          break;
      }
      return null;
    });
    return result.flat(100);
  }
  return wrapper(data).join('\n');
}
