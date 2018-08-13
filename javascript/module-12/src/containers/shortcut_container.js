import React, { PureComponent } from 'react';
import ShortcutCard from '../components/shortcut_card';

class ShortcutContainer extends PureComponent {
  render() {
    console.log('Render ShortcutContainer', this.props.shortcuts);
    const shortcuts = this.props.shortcuts;
    return (
      <div className="container">
        {shortcuts.map(e => (
          <ShortcutCard key={e.id} shortcut={e} remove={this.props.remove} />
        ))}
      </div>
    );
  }
}

export default ShortcutContainer;
