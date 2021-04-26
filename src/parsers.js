import yaml from 'js-yaml';

export default function makeParse(data, format) {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.load(data);
  }
  return null;
}
