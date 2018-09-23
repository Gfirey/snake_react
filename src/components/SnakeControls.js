import React, {Component} from 'react'
import ControlButton from './ControlButton'

class SnakeControls extends Component {

   render() {
      return (
         <div className='snake-controls'>
            <div className='snake-left_btn'>
               <ControlButton direction='left' clickFn={this.props.clickFn.bind(this, 'left')}/>
            </div>
            <div className='snake-center_btns'>
               <ControlButton direction='top' clickFn={this.props.clickFn.bind(this, 'top')}/>
               <ControlButton direction='bottom' clickFn={this.props.clickFn.bind(this, 'bottom')}/>
            </div>
            <div className='snake-right_btn'>
               <ControlButton direction='right' clickFn={this.props.clickFn.bind(this, 'right')}/>
            </div>
         </div>
      )
   }
}

export default SnakeControls;
