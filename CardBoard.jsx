import React from "react";
import Card from "./Card.jsx";

import '../assets/style/cardBoard.css';

export default class CardBoard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {cards : props.cards,
                    checkers : [],
                    completed: []

      };
      this.onCardClick = this.onCardClick.bind(this);

    }

    onCardClick(card) {
        if (this.checkersFull(this.state.checkers) || this.cardAlreadyInCheckers(this.state.checkers, card)) return
        const newCheckers = [...this.state.checkers, card]
        this.setState({checkers: newCheckers})
        console.log(this.state.checkers)
        const cardsInCheckersMatched = this.validateCheckers(newCheckers)
        if (cardsInCheckersMatched) {
          this.setState({completed:[...this.state.completed, newCheckers[0].description]})
        }
        if (this.checkersFull(newCheckers)) {
          this.resetCheckersAfter(1000)
        }
    }

    validateCheckers(checkers){
        return checkers.length === 2 &&
        checkers[0].description === checkers[1].description
    }
    cardAlreadyInCheckers(checkers, card){
      return checkers.length === 1 && checkers[0].id === card.id
    }
    checkersFull(checkers){
      return checkers.length === 2
    }
    resetCheckersAfter(time) {
      setTimeout(() => {
        this.setState({checkers : []})
      }, time)
    } 

    componentDidUpdate(prevProps,prevState){
        const newCards = this.props.cards.map(card => ({
          ...card,
          visible:
            this.state.checkers.find(c => c.id === card.id) ||
            this.state.completed.includes(card.description)
        }))
        
        if ( prevState.checkers !== this.state.checkers || prevState.completed !== this.state.completed){
          this.setState({cards:newCards})
          console.log(this.props.cards)
          console.log(this.state.checkers)
        }
    }

   
    

    render() {
        // const cards = this.props.cards.map(card => 
        //     <img 
        //     src={card.src}
        //     key={card.description}/>
        // );
        // return <div id ="cardboard">
        //     {cards}
        // </div>

    //      return (
    //         <div className="BoardCard">
    // {/* {images.map(image => ( */}
    // {/* //          <Card {...images} key={image.id} />
    // // //                         ))} */}
    //        </div>
    //       )
    const cards = this.props.cards
    return (
      <div className="cardboard">
        {cards.map(card => (
          <Card {...card} onClick={()=>this.onCardClick(card) } key={card.id} />
        ))}
      </div>
    ) 

    }
}