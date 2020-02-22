import React from "react";
import { formatName } from "../../utils/format";


function TableHead(props) {
  return (
    <th
      scope="col"
      onClick={() => props.setSort(props.col)}
      className={props.getClass(props.col)}
    >
      {formatName(props.col).toUpperCase()}
    </th>
  );
}

export default TableHead;