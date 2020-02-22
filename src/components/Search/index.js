import React from "react";
import { formatName } from "../../utils/format";

function Search(props) {

  const uniqueEntries = [...new Set(props.view.map(i => i[props.sort]))];

  return (
    <form className="form-inline mb-3">
      <div className="form-group">
        <label className="mr-2" htmlFor="search">Filter by</label>
        {/* Searchbox */}
        <input
          className="form-control"
          type="search"
          id="search"
          placeholder={formatName(props.sort)}
          list="employees"
          value={props.search}
          onChange={props.inputChange}
        />
        {/* auto-complete list */}
        <datalist id="employees">
          {
            uniqueEntries.map(entry => (
              <option value={entry} key={entry} />
            ))
          }
        </datalist>
      </div>
    </form>
  );
}

export default Search;