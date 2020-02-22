// String Formatting Utilities

/**
 * Capitalize the first letter of each word In string
 * @param {String} str
 */
const capitalize = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Converts camelCase to readable words (ex. phoneNumber => phone Number)
 * @param {String} str 
 */
const decamelize = (str) => str.split(/(?=[A-Z])/).join(" ");

/**
 * Convert Camel-Case then Capitalize each word 
 * ex: phoneNumber => Phone Number
 * @param {String} str 
 * */
const formatName = (str) => capitalize(decamelize(str));

export {
  capitalize,
  decamelize,
  formatName,
}