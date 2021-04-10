#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../files/genTree.js';

const diff = program.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(genDiff(filepath1, filepath2, options.format));
  });
program.parse(process.argv);
export default diff;
