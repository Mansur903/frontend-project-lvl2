#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../files/fileComparsion.js';

const diff = program.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2> [formatName]')
  .action((filepath1, filepath2, formatName) => genDiff(filepath1, filepath2, formatName))
  .option('-f, --format [type]', 'output format (default: "stylish")');
program.parse(process.argv);

export default diff;
