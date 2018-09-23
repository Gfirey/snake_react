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

   clickOnArrow = (direction) => {
      this.setState(state => ({
         direction: direction
      }));
   }

   handleKeyPress = (event) => {
      console.log(event.key)
   }

}

export default App;
