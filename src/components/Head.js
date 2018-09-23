import React, {Component} from 'react'

class Head extends Component {
   render() {
      const top = this.props.top + 'px';
      const left = this.props.left + 'px';
      let text;
      switch (this.props.direction) {
         case 'left': text = '←'; break;
         case 'right': text = '→'; break;
         case 'top': text = '↑'; break;
         case 'bottom': text = '↓'; break;
         default: break;
      }
      return (
         <div className='snake-head' style={{top: top, left: left}}>
            { text }
         </div>
      )
   }
}

export default Head;
