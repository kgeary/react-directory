import React, { useState } from "react";
import Employee from "../Employee";
import "./table.css";

function Table(props) {

  const filteredEmployees = () => {
    if (props.search.trim().length < 1) {
      return props.employees;
    }

    return props.employees.filter(i => i.last.toLowerCase().includes(props.search.toLowerCase()));
  }

  const [employeeSort, setEmployeeSort] = useState("first");
  const [ascending, setAscending] = useState(true);

  const dynamicSort = (property) => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    }
  }

  const sortAlpha = (name) => {
    const dir = employeeSort === name ? !ascending : true;
    const prefix = dir ? "" : "-";
    const sortedEmployees = filteredEmployees().slice().sort(dynamicSort(prefix + name));

    props.employeeViewChange(sortedEmployees);
    setEmployeeSort(name);
    setAscending(dir);
  }

  const sortNum = (name) => {
    const dir = employeeSort === name ? !ascending : true;
    const sortedEmployees = filteredEmployees().slice().sort((a, b) => {
      if (dir) {
        return a[name] - b[name];
      } else {
        return b[name] - a[name];
      }
    });
    props.employeeViewChange(sortedEmployees);
    setEmployeeSort(name);
    setAscending(dir);
  }

  const sortFirst = () => { sortAlpha("first") };
  const sortLast = () => { sortAlpha("last"); };
  const sortId = () => { sortNum("id") };

  const isActive = (name) => employeeSort === name ? "active" : ""

  const filtered = filteredEmployees();

  return (
    <div>
      <div style={{ border: "1px solid black", marginBottom: "2rem" }}>
        <div className="jumbotron mb-0">
          <h1>Employees Table</h1>
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={sortFirst} className={isActive("first")}>First</th>
              <th scope="col" onClick={sortLast} className={isActive("last")}>Last</th>
              <th scope="col" onClick={sortId} className={isActive("id")}>Id</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredEmployees().map(employee => (
                <Employee employee={employee} />
              ))
            }
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: "-2rem" }}>
        Displaying {filtered.length} Employee{filtered.length === 1 ? "" : "s"}
      </p>
    </div >
  );
}


export default Table;