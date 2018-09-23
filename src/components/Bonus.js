import React, {Component} from 'react'

class Bonus extends Component {

   render() {
      const top = this.props.top + 'px';
      const left = this.props.left + 'px';
      return (
         <div className='snake-bonus' style={{'top': top, 'left': left}}>
         </div>
      )
   }

}

export default Bonus;
