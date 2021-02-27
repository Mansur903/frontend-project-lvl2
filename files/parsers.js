import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

function parseJSON(filepath) {
  return JSON.parse(readFileSync(path.resolve(`${process.cwd()}`, `${filepath}`), 'utf-8'));
}

function parseYAML(filepath) {
  return yaml.load(readFileSync(path.resolve(`${process.cwd()}`, `${filepath}`), 'utf-8'));
}

export default function chooseParseFormat(filepath) {
  const format = path.extname(filepath);
  let file;
  if (format === '.json') {
    file = parseJSON(filepath);
  }
  if (format === '.yaml') {
    file = parseYAML(filepath);
  }
  return file;
}
