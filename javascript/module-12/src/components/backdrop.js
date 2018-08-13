import React, { Component } from 'react';

class BackDrop extends Component {
  render() {
    return <div className="backdrop">{this.props.children}</div>;
  }
}

export default BackDrop;
