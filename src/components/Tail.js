import React, {Component} from 'react'

class Tail extends Component {
   render() {
      let className = 'snake-tail';
      if (this.props.delay > 0) {
         className = className + ' snake-tail__waiting'
      }
      return (
         <div className={ className } style={{top: this.props.tailTop, left: this.props.tailLeft}}></div>
      )
   }
}

export default Tail;
