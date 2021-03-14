export default function stylish(data) {
  const defIndient = 1;
  let string = '{\n';
  data.map((item) => {
    if (item.value === '}\n') {
      string += `${'  '.repeat(item.depth + defIndient)}${item.value}`;
    }
    if (item.value === 'obj') {
      string += `${'  '.repeat(item.depth)}${item.status}${item.name}: {\n`;
    }
    if (item.value !== 'obj' && item.value !== '}\n') {
      string += `${'  '.repeat(item.depth)}${item.status}${item.name}: ${item.value}\n`;
    }
    return string;
  });
  return `${string}`;
}
