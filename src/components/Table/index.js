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
    <div className="table-layout">
      <div className="table-container">
        <table className="table table-striped table-hover mb-0">
          <colgroup>
            {props.cols.map((col, index) => props.visible[index] ?
              <col className={props.getClass(col)} key={col} />
              : null
            )}
          </colgroup>

          <thead className="thead-dark">
            <tr>
              {props.cols.map((col, index) => props.visible[index] ?
                <TableHead
                  setSort={props.setSort}
                  getClass={props.getClass}
                  col={col}
                  key={col}
                /> : null
              )}
            </tr>
          </thead>
          <tbody>
            {props.view.map(employee => (
              <tr
                data-id={employee.id}
                key={employee.id}
                onClick={props.onClick}
                onDoubleClick={() => saveEmployee(employee)}
              >
                <Employee
                  employee={employee}
                  cols={props.cols}
                  visible={props.visible}
                />
              </tr>
            ))}
          </tbody>
        </table >
      </div >
      <p className="m-1 record-count">
        Displaying {props.view.length} Employee{props.view.length === 1 ? "" : "s"}
      </p>
    </div >
  );
}


export default Table;