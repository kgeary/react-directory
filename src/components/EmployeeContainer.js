import React from "react";
import Table from './Table'
import Search from './Search'
import seed from "../tempSeed";
import { getSortFunc } from "../utils/sort";

class Container extends React.Component {
  state = {
    employees: seed,
    view: seed,
    search: "",
    sort: "id",
    asc: true,
  };

  searchChange = (event) => {
    const search = event.target.value.trim();

    // filter results
    const view = this.state.employees
      .filter(employee => employee[this.state.sort]
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()))

    // re-apply sorting
    view.sort(getSortFunc(this.state.sort, this.state.asc));

    // save the state
    this.setState({ search: search, view: view })
  };

  setSort = (sort) => {
    // Toggle The direction if we are already sorted in this direction
    // Else update the sort column and default to ascending

    const newState = {};
    if (this.state.sort === sort) {
      newState.asc = !this.state.asc;
      newState.sort = sort;
    } else {
      newState.asc = true;
      newState.sort = sort;
      newState.search = "";
    }
    newState.view = [...this.state.view];
    newState.view
      .sort(getSortFunc(newState.sort, newState.asc))
    this.setState(newState);
  };

  getClass = (colName) => {
    if (this.state.sort === colName) {
      return this.state.asc ? "active asc" : "active desc"
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="container">
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
        />
      </div>
    );
  }
}

export default Container;