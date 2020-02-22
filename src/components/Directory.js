import React from "react";
import Table from './Table'
import Search from './Search'
import seed from "../utils/seed";
import download from "../utils/download";
import { getSortFunc } from "../utils/sort";

const allColumns = Object.keys(seed[0]);
const excludeColumns = ["isManager"];
const visibleCols = allColumns.filter(x => !excludeColumns.includes(x));

class Container extends React.Component {
  state = {
    employees: seed,
    view: seed,
    search: "",
    sort: "id",
    asc: true,
    cols: visibleCols
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
    const newState = {};
    if (this.state.sort === sort) {
      // Toggle The direction if we are already sorted in this direction
      newState.asc = !this.state.asc;
      newState.sort = sort;
    } else {
      // Else update the sort column and default to ascending
      newState.asc = true;
      newState.sort = sort;
      newState.search = "";
    }
    // Apply the sort and direction to our current view
    newState.view = [...this.state.view];
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

  downloadView = () => {
    download(JSON.stringify(this.state.view, null, 2));
  }

  render() {
    return (
      <div className="container mb-5">
        <div className="jumbotron mb-0">
          <h1>Employees Table</h1>
        </div>
        <p></p>
        <Search
          sort={this.state.sort}
          search={this.state.search}
          view={this.state.view}
          inputChange={this.searchChange}
        />
        <Table
          view={this.state.view}
          getClass={this.getClass}
          setSort={this.setSort}
          cols={this.state.cols}
        />
        <button
          className="btn btn-primary"
          onClick={this.downloadView}>
          Save View To File
        </button>
      </div>
    );
  }
}

export default Container;