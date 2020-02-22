import React from "react";

function Search(props) {

  return (
    <form class="form-inline">
      <div className="form-group">
        <label className="mr-2" htmlFor="search">Search by Last Name</label>
        <input
          className="form-control"
          type="search"
          id="search"
          placeholder="Last Name"
          list="employees"
          onChange={props.inputChange}
        />
        <datalist id="employees">
          {props.employees.map(employee => (
            <option value={employee.last} key={employee.id} />
          ))}
        </datalist>
      </div>
    </form>
  );
}

export default Search;