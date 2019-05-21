import React from 'react';
import { SketchPicker } from 'react-color';

class ColorSelector extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <SketchPicker
        ref={this.ref}
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}

export default ColorSelector
