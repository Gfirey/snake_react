import React, {Component} from 'react'
import Head from './Head'
import Tail from './Tail'
import Bonus from './Bonus'

class Snake extends Component {

   constructor(props) {
      super(props);
      this.state = {
         headTop: 0,
         headLeft: 0,
         bonusTop: 0,
         bonusLeft: 0,
         direction: 'right',
         tailCoordinates: []
      };
      this.snakeLength = 0;
   };

   render() {
      let tailMarkup = this.state.tailCoordinates.map((obj) => obj.markUp);
      return (
         <div className='snake-board'>
            <Head top={this.state.headTop} left={this.state.headLeft} direction={this.state.direction}/>
            <Bonus top={this.state.bonusTop} left={this.state.bonusLeft}/>
            { tailMarkup }
         </div>
      )
   }

   componentWillReceiveProps(nextProps) {
      const {direction} = nextProps;
      this.setState({
         direction: direction,
         isNextTurn: true
      })
   }

   componentDidMount() {
      var intervalId = setInterval(this.moveSnake.bind(this), 500);
      this.setState({intervalId: intervalId});
   }

   componentWillUnmount() {
      clearInterval(this.state.intervalId);
   }

   moveSnake() {
      let {newLeft, newTop} = this.getNewCoord(this.state.headLeft, this.state.headTop, this.state.direction);
      this.setState({
         headTop: newTop,
         headLeft: newLeft,
         tailCoordinates: this.state.tailCoordinates.slice().reverse().map((tailObj) => {
            tailObj.direction = tailObj.isNextTurn ? tailObj.nextDirection : tailObj.direction;
            tailObj.nextDirection = tailObj.prevTail ? (tailObj.prevTail.isNextTurn ? tailObj.prevTail.nextDirection : tailObj.prevTail.direction) : this.state.direction;
            tailObj.isNextTurn = tailObj.nextDirection !== tailObj.direction;

            if (tailObj.delay < 1) {
               let {newLeft, newTop} = this.getNewCoord(tailObj.tailLeft, tailObj.tailTop, tailObj.direction);
               tailObj.tailLeft = newLeft;
               tailObj.tailTop = newTop;
            } else {
               tailObj.delay = tailObj.delay - 1;
            }

            tailObj.markUp = <Tail key={ tailObj.key } tailTop={tailObj.tailTop} tailLeft={tailObj.tailLeft} delay={tailObj.delay}/>;
            return tailObj
         }).reverse()
      });
      this.checkBonusHit();
   }

   getNewCoord(left, top, direction) {
      const squareSize = 25;
      let newTop = top;
      let newLeft = left;
      switch (direction) {
         case 'left':
            newLeft = newLeft - squareSize;
            break;
         case 'right':
            newLeft = newLeft + squareSize;
            break;
         case 'top':
            newTop = newTop - squareSize;
            break;
         case 'bottom':
            newTop = newTop + squareSize;
            break;
         default:
            break;
      }
      if (newLeft < 0) newLeft = newLeft + 250;
      if (newLeft > 225) newLeft = newLeft - 250;
      if (newTop < 0) newTop = newTop + 250;
      if (newTop > 225) newTop = newTop - 250;
      return {newLeft: newLeft, newTop: newTop}

   }

   checkBonusHit() {
      if (this.state.headLeft === this.state.bonusLeft && this.state.headTop === this.state.bonusTop) {
         console.log('Hit!');
         let key = this.state.tailCoordinates.length;
         let prevTail = key ? this.state.tailCoordinates[key - 1] : null;
         let direction = prevTail ? prevTail.direction: this.state.direction;

         var newCoord = this.state.tailCoordinates.slice();
         newCoord.push({
            tailLeft: this.state.headLeft,
            tailTop: this.state.headTop,
            direction: direction,
            nextDirection: direction,
            isNextTurn: false,
            key: key,
            delay: key + 1,
            prevTail: prevTail,
            markUp: <Tail key={ key } tailTop={this.state.headTop} tailLeft={this.state.headLeft} delay={key}/>
         });
         this.setState({
            //переместим бонус
            bonusTop: Snake.getRandomCoordinate(),
            bonusLeft: Snake.getRandomCoordinate(),
            // добавим хвост
            tailCoordinates: newCoord
         });
      }
   }

   static getRandomCoordinate() {
      return Math.floor(Math.random() * 10) * 25;
   }

   static makeCounter() {
      var currentCount = 1;
      return () => currentCount++;
   }

}

export default Snake;
