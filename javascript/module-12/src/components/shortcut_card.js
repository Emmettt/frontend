import React, { PureComponent } from 'react';

class ShortcutCard extends PureComponent {
  render() {
    console.log('Render ShortcutCard');

    return (
      <div
        className="card"
        onClick={() => window.open(this.props.shortcut.url, '_blank')}
      >
        <div>
          <button
            className="xButton"
            onClick={e => {
              e.stopPropagation();
              this.props.remove(this.props.shortcut.id);
            }}
          >
            X
          </button>
          <p className="title">{this.props.shortcut.title}</p>
          <img src={this.props.shortcut.image} alt="pic" width={200} />
          <p className="description">{this.props.shortcut.description}</p>
        </div>
        <p>{this.props.shortcut.url}</p>
      </div>
    );
  }
}

export default ShortcutCard;
