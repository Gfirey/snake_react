import React, {Component} from 'react'
import Snake from './Snake'
import SnakeControls from './SnakeControls'


class App extends Component {
   state = {
      direction: null
   };

   render() {
      return (
         <div className='snake-app'>
            <Snake
               direction={this.state.direction}
            />
            <SnakeControls clickFn={this.clickOnArrow}/>
         </div>
      )
   }

   componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
   }

   componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
   }

   clickOnArrow = (direction) => {
      this.setState(state => ({
         direction: direction
      }));
   };

   handleKeyDown = (event) => {
      let newDirection;
      switch (event.keyCode) {
         case 37: newDirection = 'left'; break;
         case 38: newDirection = 'top'; break;
         case 39: newDirection = 'right'; break;
         case 40: newDirection = 'bottom'; break;
         default: newDirection = this.state.direction; break;
      }
      if (newDirection !== this.state.direction) {
         this.setState(state => ({
            direction: newDirection
         }))
      }
   }
}

export default App;
