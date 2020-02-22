import React from "react";
import Table from './Table'
import Search from './Search'
import seed from "../tempSeed";

class Container extends React.Component {
  state = {
    employees: seed,
    search: ""
  };

  searchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  employeeViewChange = (newEmployees) => {
    this.setState({ employees: newEmployees });
  }

  render() {
    return (
      <div className="container">
        <p></p>
        <Table
          employees={this.state.employees}
          employeeViewChange={this.employeeViewChange}
          search={this.state.search}
        />
        <Search employees={this.state.employees} inputChange={this.searchChange} />
      </div>
    );
  }
}

export default Container;