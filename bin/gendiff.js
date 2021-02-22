#!/usr/bin/env node
import { program } from 'commander';
import flatFileComparsion from '../files/flatFileComparsion.js';

export default program.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => flatFileComparsion(filepath1, filepath2))
  .option('-f, --format [type]', 'output format');
program.parse(process.argv);