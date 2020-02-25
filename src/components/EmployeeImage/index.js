import React from "react";
import "./style.css";

function EmployeeImage(props) {

  const getName = () => {
    if (props.employee) {
      return `${props.employee.firstName} ${props.employee.lastName}`;
    } else {
      return "No Employee";
    }
  }

  return (
    <div className="card employee-image-container">
      {props.employee ?
        <React.Fragment>
          <div className="card-image">
            <img
              alt={getName()}
              className="employee-image"
              src={props.employee.img || "http://placeholder.pics/svg/300"}
            />
          </div>
          <div className="card-body">
            <h3>{getName()}</h3>
            <h4>{props.employee.department}</h4>
            <h5>{props.employee.role}</h5>
            <h6>Phone: {props.employee.phoneNumber}</h6>
          </div>
        </React.Fragment> :
        <h5 className="p-2">No Employee Selected</h5>
      }
    </div>
  );
}

export default EmployeeImage;