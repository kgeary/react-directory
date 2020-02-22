import React from "react";

function Employee(props) {
  return (
    <React.Fragment>
      {
        (props.cols).map((col) => (
          <td key={col}>{props.employee[col].toString()}</td>
        ))
      }
    </React.Fragment>
  )
}

export default Employee;
