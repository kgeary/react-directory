import React from "react";

function Employee(props) {
  return (
    <tr key={props.employee.id}>
      <td className="first">{props.employee.first}</td>
      <td className="last">{props.employee.last}</td>
      <td className="id">{props.employee.id}</td>
    </tr>
  )
}

export default Employee;
