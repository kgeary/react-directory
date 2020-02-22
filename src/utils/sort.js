/**
 * Returns a function to sort an array of objects on a given column in a given 
 * direction. Currently supports strings and numbers.
 * @param {String} sort Object Property name to sort on 
 * @param {Boolean} asc True for sort ascending, False for sort descending
 */
const getSortFunc = (sort, asc) => {
  return (a, b) => {
    switch (typeof a[sort]) {
      // Sort Numeric Properties
      case "number":
        return asc ?
          a[sort] - b[sort] :
          b[sort] - a[sort];

      // Sort String, Boolean Properties
      case "string":
        return asc ?
          a[sort].localeCompare(b[sort]) :
          b[sort].localeCompare(a[sort])

      case "boolean":
        return asc ?
          (a[sort] === b[sort] ? 0 : a[sort] ? -1 : 1) :
          (b[sort] ? -1 : 1)
      // Other types not currently supported
      default:
        throw new Error(`Sorting by ${typeof a[sort]} not supported!`);
    }
  }
}

export { getSortFunc };
