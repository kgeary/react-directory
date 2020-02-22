import React from "react";

function Employee(props) {
  return (
    <React.Fragment>
      <td>{props.employee.id}</td>
      <td>{props.employee.firstName}</td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.department}</td>
      <td>{props.employee.role}</td>
    </React.Fragment>
  )
}

export default Employee;
