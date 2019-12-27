import React, { Component } from "react";

export default class EmptyButton extends Component {
  render() {
    return (
      <div className='col'>
        <button className="btn btn-danger btn-lg mt-1">
          <i className="fa fa-frown-o fa-lg mr-2"></i>Empty category !
        </button>
      </div>
    );
  }
}
