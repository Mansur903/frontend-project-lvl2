import yaml from 'js-yaml';

export default (data, format) => {
  const formatList = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };
  return formatList[format](data);
};
