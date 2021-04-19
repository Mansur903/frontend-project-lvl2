function isStringValue(item) {
  if (typeof item !== 'string') return false;
  return true;
}

function isItemObject(item) {
  if (typeof item === 'object' && item !== null) return true;
  return false;
}

function genPath(path, item) {
  const pathChain = [...path, item];
  return pathChain;
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
      if (item.status === 'added') {
        if (isItemObject(item.value)) {
          return generateResult('added', resultPath, '[complex value]');
        }
        if (!isStringValue(item.value)) {
          return generateResult('added', resultPath, item.value);
        }
        return generateResult('added', resultPath, `'${item.value}'`);
      }
      if (item.status === 'removed') {
        return generateResult('removed', resultPath);
      }
      if (item.status === 'changed') {
        if (isItemObject(item.oldValue) && isItemObject(item.newValue)) {
          return generateResult('changed', resultPath, '[complex value]', '[complex value]');
        }
        if (isItemObject(item.oldValue)) {
          if (!isStringValue(item.newValue)) return generateResult('changed', resultPath, '[complex value]', `${item.newValue}`);
          return generateResult('changed', resultPath, '[complex value]', `'${item.newValue}'`);
        }
        if (isItemObject(item.newValue)) {
          if (!isStringValue(item.oldValue)) return generateResult('changed', resultPath, `${item.oldValue}`, '[complex value]');
          return `Property '${resultPath}' was updated. From '${item.oldValue}' to [complex value]`;
        }
        if (!isStringValue(item.newValue) && !isStringValue(item.oldValue)) {
          return generateResult('changed', resultPath, `${item.oldValue}`, `${item.newValue}`);
        }
        if (!isStringValue(item.oldValue)) {
          return generateResult('changed', resultPath, `${item.oldValue}`, `'${item.newValue}'`);
        }
        if (!isStringValue(item.newValue)) {
          return generateResult('changed', resultPath, `'${item.oldValue}'`, `${item.newValue}`);
        }
        return generateResult('changed', resultPath, `'${item.oldValue}'`, `'${item.newValue}'`);
      }
      if (item.status === 'bothObjects') return wrapper(item.children, generatedPath);
      return null;
    });
    return result.flat(100);
  }
  return wrapper(data).join('\n');
}
