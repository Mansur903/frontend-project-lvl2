function removeExtraPoints(path) {
  let pathItems = path.split('');
  if (pathItems[0] === '.') {
    pathItems = pathItems.slice(1, pathItems.length);
  }
  if (pathItems[pathItems.length - 1] === '.') {
    pathItems = pathItems.slice(0, pathItems.length - 1);
  }
  const newPath = pathItems.join('');
  return newPath;
}

function isStringValue(item) {
  if (item === true || item === false || item === null) return false;
  return true;
}

export default function plain(data) {
  let resultString = '';
  let previousPath = '';
  let path = '';
  let previousItem = { depth: 0 };
  let thisItem;
  let previousValue;
  data.map((item) => {
    if (!isStringValue(item.value)) {
      thisItem = item.value;
    } else {
      thisItem = `'${item.value}'`;
    }
    if (!isStringValue(previousItem.value)) {
      previousValue = previousItem.value;
    } else {
      previousValue = `'${previousItem.value}'`;
    }
    if (item.depth > previousItem.depth) path += `${item.name}.`;
    if (item.depth < previousItem.depth) {
      const depthDifference = previousItem.depth - item.depth;
      path = path.substring(0, path.length - 1);
      let pathItems = path.split('.');
      pathItems = pathItems.slice(0, pathItems.length - depthDifference);
      path = pathItems.join('.');
      previousItem = { depth: previousItem.depth };
    }
    if (item.depth === previousItem.depth) {
      path = path.substring(0, path.length - 1);
      let pathItems = path.split('.');
      pathItems = pathItems.slice(0, pathItems.length - 1);
      if (path !== '') {
        path = `${pathItems.join('.')}.`;
      }
      path += `${item.name}.`;
    }
    if (removeExtraPoints(path) === removeExtraPoints(previousPath)) {
      let resultStringItems = resultString.split('\n');
      resultStringItems = resultStringItems.slice(0, resultStringItems.length - 2);
      resultString = `${resultStringItems.join('\n')}\n`;
      if (previousItem.value.toString().substring(0, 1) === '{') {
        if (item.value.toString().substring(0, 1) === '{') {
          resultString += `Property '${removeExtraPoints(path)}' was updated. From [complex value] to [complex value]\n`;
        } else {
          resultString += `Property '${removeExtraPoints(path)}' was updated. From [complex value] to ${thisItem}\n`;
        }
      } else {
        resultString += `Property '${removeExtraPoints(path)}' was updated. From ${previousValue} to ${thisItem}\n`;
      }
    } else if (typeof item === 'object') {
      if (item.status === '+ ' && item.value.toString().substring(0, 1) === '{') {
        resultString += `Property '${removeExtraPoints(path)}' was added with value: [complex value]\n`;
      } else if (item.status === '+ ') {
        resultString += `Property '${removeExtraPoints(path)}' was added with value: ${thisItem}\n`;
      }
      if (item.status === '- ') {
        resultString += `Property '${removeExtraPoints(path)}' was removed\n`;
      }
    } else {
      if (item.status === '+ ' && item.value.substring(0, 1) === '{') {
        resultString += `Property '${removeExtraPoints(path)}' was added with value: [complex value]\n`;
      } else if (item.status === '+ ') {
        resultString += `Property '${removeExtraPoints(path)}' was added with value: ${thisItem}\n`;
      }
      if (item.status === '- ') {
        resultString += `Property '${removeExtraPoints(path)}' was removed\n`;
      }
    }
    previousItem = item;
    previousPath = path;
    return resultString;
  });
  return resultString.substring(0, resultString.length - 1);
}
