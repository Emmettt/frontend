import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal">
        <h2>{this.props.msg}</h2>
        <button className="modalButton" onClick={this.props.closeModal}>
          OK
        </button>
      </div>
    );
  }
}

export default Modal;
