function genPath(path, item) {
  const pathChain = [...path, item];
  return pathChain;
}

function stringify(item) {
  if (typeof item === 'object' && item !== null) return '[complex value]';
  if (typeof item === 'string') return `'${item}'`;
  return `${item}`;
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
          return `Property '${resultPath}' was added with value: ${stringify(item.value)}`;
        case 'removed':
          return `Property '${resultPath}' was removed`;
        case 'changed':
          return `Property '${resultPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
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
