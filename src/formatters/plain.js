/* function isStringValue(item) {
  if (item === true || item === false || item === null ||) return false;
  return true;
} */

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

export default function plain(data) {
  function wrapper(thisData, path = []) {
    const thisPath = path;
    const onlyModifiedValues = thisData.filter((item) => item.status !== 'unchanged');
    const result = onlyModifiedValues.map((item) => {
      const generatedPath = genPath(thisPath, item.name);
      if (item.status === 'added') {
        if (!isStringValue(item.value)) {
          return `Property '${generatedPath.join('.')}' was added with value: ${item.value}`;
        }
        if (typeof item.value === 'object') {
          return `Property '${generatedPath.join('.')}' was added with value: [complex value]`;
        } return `Property '${generatedPath.join('.')}' was added with value: '${item.value}'`;
      }
      if (item.status === 'removed') {
        return `Property '${generatedPath.join('.')}' was removed`;
      }
      if (item.status === 'changed') {
        if (isItemObject(item.oldValue) && isItemObject(item.newValue)) {
          return `Property '${generatedPath.join('.')}' was updated. From [complex value] to [complex value]`;
        }
        if (isItemObject(item.oldValue)) {
          return `Property '${generatedPath.join('.')}' was updated. From [complex value] to '${item.newValue}'`;
        }
        if (isItemObject(item.newValue)) {
          return `Property '${generatedPath.join('.')}' was updated. From '${item.oldValue}' to [complex value]`;
        }
        if (!isStringValue(item.newValue) && !isStringValue(item.oldValue)) {
          return `Property '${generatedPath.join('.')}' was updated. From ${item.oldValue} to ${item.newValue}`;
        }
        if (!isStringValue(item.oldValue)) {
          return `Property '${generatedPath.join('.')}' was updated. From ${item.oldValue} to '${item.newValue}'`;
        }
        if (!isStringValue(item.newValue)) {
          return `Property '${generatedPath.join('.')}' was updated. From '${item.oldValue}' to ${item.newValue}`;
        }
        return `Property '${generatedPath.join('.')}' was updated. From '${item.oldValue}' to '${item.newValue}'`;
      }
      if (item.status === 'bothObjects') return wrapper(item.children, generatedPath);
      return null;
    });
    return result.flat(100);
  }
  return wrapper(data).join('\n');
}
