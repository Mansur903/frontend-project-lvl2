import { readFileSync } from 'fs';
import path from 'path';
import makeParse from './parsers.js';
import chooseFormat from './formatters/index.js';
import genTree from './genTree.js';

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const dataOfFile1 = readFileSync(path.resolve(`${process.cwd()}/__fixtures__/`, `${filepath1}`), 'utf-8');
  const dataOfFile2 = readFileSync(path.resolve(`${process.cwd()}/__fixtures__/`, `${filepath2}`), 'utf-8');
  const format = path.extname(filepath1);
  const parsedData1 = makeParse(dataOfFile1, format);
  const parsedData2 = makeParse(dataOfFile2, format);
  const generatedTree = genTree(parsedData1, parsedData2);
  return chooseFormat(formatName, generatedTree);
}
