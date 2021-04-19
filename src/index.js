import chooseParseFormat from './files/parsers.js';
import chooseFormat from './formatters/index.js';
import genTree from './files/genTree.js';

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const dataOfFile1 = chooseParseFormat(filepath1);
  const dataOfFile2 = chooseParseFormat(filepath2);
  const generatedTree = genTree(dataOfFile1, dataOfFile2);
  return chooseFormat(formatName, generatedTree);
}
