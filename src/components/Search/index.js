import React from "react";
import { formatName } from "../../utils/format";

function Search(props) {


  return (
    <form className="form-inline mb-3">
      <div className="form-group">
        <label className="mr-2" htmlFor="search">Search by</label>
        <input
          className="form-control"
          type="search"
          id="search"
          placeholder={formatName(props.sort)}
          list="employees"
          value={props.search}
          onChange={props.inputChange}
        />
        <datalist id="employees">
          {props.view.map(employee => (
            <option value={employee[props.sort]} key={employee.id} />
          ))}
        </datalist>
      </div>
    </form>
  );
}

export default Search;