import React from "react";
import { formatName } from "../../utils/format";

function ColFilter(props) {
  return (
    <form className="mb-3 mx-3 fields-form">
      <span className="fields-heading pr-2" style={{ display: "inline-block", fontWeight: "bold" }}>Available Fields:</span>
      <div className="fields-group" style={{ display: "flex", flexWrap: "wrap" }}>
        {
          props.cols.map((col, index) => (
            <div className="form-check form-check-inline px-2" key={col}>
              <input
                id={"check-" + col}
                type="checkbox"
                className="form-check-input"
                name={col}
                defaultChecked={props.visible[index]}
                onChange={(event) => props.modifyColumn(index, event.target.checked)}
              />
              <label
                className="form-check-label"
                type="checkbox"
                name={col}
                htmlFor={"check-" + col}
              >
                {formatName(col)}
              </label>
            </div>
          ))
        }
      </div>
    </form >
  );
}

export default ColFilter;