#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(genDiff(filepath1, filepath2, options.format));
  })
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
