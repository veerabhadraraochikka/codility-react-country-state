import React from "react";
import "./App.css";
import Task from "./task";

export default class App extends React.Component {
  data = {
    Australia: "Canberra",
    India: "Delhi",
    Bangladesh: "Dhaka",
    "Czech Republic": "Prague",
  };
  render() {
    return <Task data={this.data}></Task>;
  }
}
