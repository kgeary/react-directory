import React from "react";
import Employee from "../Employee";
import "./table.css";
import TableHead from "../TableHead";
import toastr from "toastr";
import "toastr/build/toastr.css";
function Table(props) {

  const saveEmployee = (employee) => {
    toastr.success("Employee Saved to Clipboard", "", { timeOut: 2000 });
    navigator.clipboard.writeText(JSON.stringify(employee, null, 2));
  }

  return (
    <div>
      <div style={{ border: "1px solid black", marginBottom: "2rem" }}>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <TableHead setSort={props.setSort} getClass={props.getClass} col="id" />
              <TableHead setSort={props.setSort} getClass={props.getClass} col="firstName" />
              <TableHead setSort={props.setSort} getClass={props.getClass} col="lastName" />
              <TableHead setSort={props.setSort} getClass={props.getClass} col="department" />
              <TableHead setSort={props.setSort} getClass={props.getClass} col="role" />
            </tr>
          </thead>
          <tbody>
            {
              props.view.map(employee => (
                <tr onDoubleClick={() => saveEmployee(employee)} key={employee.id}>
                  <Employee employee={employee} />
                </tr>
              ))
            }
          </tbody>
        </table >
      </div >
      <p style={{ marginTop: "-2rem" }}>
        Displaying {props.view.length} Employee{props.view.length === 1 ? "" : "s"}
      </p>
    </div >
  );
}


export default Table;