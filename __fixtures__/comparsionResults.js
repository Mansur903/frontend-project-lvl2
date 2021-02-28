export const file12ComparsionResultJSON = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

const file12ComparsionResultYAML = `{
 - follow: false
 - host: hexlet.io
 + host: google.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 40
 + verbose: true
}`;

export default file12ComparsionResultYAML;
