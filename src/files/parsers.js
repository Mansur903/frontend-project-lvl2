import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

function parseJSON(filepath) {
  return JSON.parse(readFileSync(path.resolve(`${process.cwd()}/__fixtures__/`, `${filepath}`), 'utf-8'));
}

function parseYAML(filepath) {
  return yaml.load(readFileSync(path.resolve(`${process.cwd()}/__fixtures__/`, `${filepath}`), 'utf-8'));
}

export default function chooseParseFormat(filepath) {
  const format = path.extname(filepath);
  if (format === '.json') {
    return parseJSON(filepath);
  }
  if (format === '.yml') {
    return parseYAML(filepath);
  }
  return null;
}
