import React, {Component} from 'react'

class ControlButton extends Component {
   render() {
      const {direction} = this.props;
      let text;
      switch (direction) {
         case 'left': text = '←'; break;
         case 'right': text = '→'; break;
         case 'top': text = '↑'; break;
         case 'bottom': text = '↓'; break;
         default: break;
      }
      return (
         <button className='snake-control_button' onClick={this.props.clickFn}>
            { text }
         </button>
      )
   }

}

export default ControlButton;