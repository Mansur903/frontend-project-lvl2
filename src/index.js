import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import formateData from './formatters/index.js';
import genTree from './genTree.js';

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const dataFile1 = readFileSync(filepath1, 'utf-8');
  const dataFile2 = readFileSync(filepath2, 'utf-8');
  const firstFileFormat = path.extname(filepath1).slice(1);
  const secondFileFormat = path.extname(filepath2).slice(1);
  const parsedData1 = parse(dataFile1, firstFileFormat);
  const parsedData2 = parse(dataFile2, secondFileFormat);
  const generatedTree = genTree(parsedData1, parsedData2);
  return formateData(formatName, generatedTree);
}
