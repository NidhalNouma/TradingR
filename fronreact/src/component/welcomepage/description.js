import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Desc extends Component {
  render() {
    return (
      <div className={this.props.class}>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        {this.props.to ? <Link to={this.props.to}>{this.props.link}</Link> : ""}
      </div>
    );
  }
}
