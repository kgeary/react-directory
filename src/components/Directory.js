import React from "react";
import EmployeeImage from "./EmployeeImage";
import Table from "./Table";
import Search from "./Search";
import ColFilter from "./ColFilter";
import seed from "../utils/seed";
import download from "../utils/download";
import { getSortFunc } from "../utils/sort";
import "./directory.css";

// Not Shown by default but will can be enabled
const excludeColumns = ["isManager"];

// Not shown by default and cannot be shown
const removeColumns = ["img"];

const allColumns = Object.keys(seed[0]).filter(col => !removeColumns.includes(col));

class Directory extends React.Component {
  state = {
    employees: seed,
    view: seed,
    search: "",
    sort: allColumns[0],
    asc: true,
    cols: allColumns,
    visible: allColumns.map((col) => !excludeColumns.includes(col) && !removeColumns.includes(col)),
    currentId: null,
  };

  searchChange = (event) => {
    // Get search text
    const search = event.target.value.trim();

    // filter results
    const view = this.state.employees
      .filter(employee => employee[this.state.sort]
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()))

    // re-apply sorting
    view.sort(getSortFunc(this.state.sort, this.state.asc));

    // Update state
    this.setState({ search: search, view: view })
  };

  setSort = (sort) => {
    if (!this.state.cols.includes(sort)) throw new Error("Unknown Sort!");
    const newState = {};
    if (this.state.sort === sort) {
      // Toggle The direction if we are already sorted in this direction
      newState.asc = !this.state.asc;
      newState.sort = sort;
      newState.view = [...this.state.view];
    } else {
      // Else update the sort column and default to ascending
      newState.asc = true;
      newState.sort = sort;
      newState.search = "";
      newState.view = [...this.state.employees];
    }
    // Apply the sort and direction to our current view
    newState.view.sort(getSortFunc(newState.sort, newState.asc))
    this.setState(newState);
  };

  getClass = (colName) => {
    // Get Column Class Names to see if column is active and its sort direction
    if (this.state.sort === colName) {
      return this.state.asc ? "active asc" : "active desc"
    } else {
      return "";
    }
  }

  clickEmployee = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    if (id) {
      this.setState({ currentId: parseInt(id) });
    }
  }

  // Return the last employee that was clicked on
  getCurrentEmployee() {
    const id = this.state.currentId;
    const filtered = this.state.employees.filter(employee => employee.id === id);
    if (filtered.length) {
      const employee = filtered[0];
      return employee;
    } else {
      return null;
    }
  }


  modifyColumn = (index, isVisible) => {
    if (index < 0 || index >= this.state.cols.length) throw new Error(`modifyColumn: Invalid Column Index! ${index}`);
    const visible = [...this.state.visible];
    visible[index] = isVisible;
    this.setState({ visible })
  }

  downloadView = () => {
    download(JSON.stringify(this.state.view, null, 2));
  }

  render() {
    return (
      <div className="container-fluid mb-5">
        <div className="jumbotron mb-0" style={{ background: "linear-gradient(#444, #666, #444)" }}>
          <h1 style={{ color: "whitesmoke", textShadow: "black 2px -2px" }}>Employee Directory</h1>
        </div>
        <p></p>
        <div style={{ display: "sticky", top: "2rem" }}>
          <ColFilter
            cols={this.state.cols}
            visible={this.state.visible}
            modifyColumn={this.modifyColumn}
          />
          <Search
            sort={this.state.sort}
            search={this.state.search}
            view={this.state.view}
            inputChange={this.searchChange}
          />
        </div>

        <div className="row">
          <div className="col-md-9">
            <Table
              view={this.state.view}
              getClass={this.getClass}
              setSort={this.setSort}
              cols={this.state.cols}
              visible={this.state.visible}
              onClick={this.clickEmployee}
            />
            <button
              className="btn btn-primary"
              onClick={this.downloadView}
            >
              Save View To File
            </button>
          </div>
          <div className="col-md-3">
            <EmployeeImage employee={this.getCurrentEmployee()} />
          </div>
        </div>
      </div>
    );
  }
}

export default Directory;