const getSortFunc = (sort, asc) => {
  return (a, b) => {
    if (typeof a[sort] === "number") {
      return asc ?
        a[sort] - b[sort] :
        b[sort] - a[sort]
    } else { // string
      return asc ?
        a[sort].localeCompare(b[sort]) :
        b[sort].localeCompare(a[sort])
    }
  }
}

export { getSortFunc };
