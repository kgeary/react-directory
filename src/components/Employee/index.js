import React from "react";

function Employee(props) {
  return (
    <React.Fragment>
      {
        (props.cols).map((col, index) => (
          props.visible[index] ?
            <td key={col}>{props.employee[col].toString()}</td> :
            null
        ))
      }
    </React.Fragment>
  )
}

export default Employee;
