const capitalize = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());
const decamelize = (str) => str.split(/(?=[A-Z])/).join(" ");
const formatName = (str) => capitalize(decamelize(str));

export {
  capitalize,
  decamelize,
  formatName,
}