import React from "react";
import CardBoard from './CardBoard.jsx';
import { UNKNOWN_SRC } from "../data/cardData.js";
import '../assets/style/memory.css';
import {cardData} from '../data/cardData.js';
import {shuffle} from '../scripts/utils.js'
//import Card from "./Card.jsx";

/*
 define root component
*/
export default class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards : [] };
  }


  componentDidMount() {
    let id =0;
    this.setState({ cards : cardData })
  }
  getcard(){ 
    let id =0; 
    let newcards = this.state.cards
    
    const images = Object.keys(newcards).reduce((result,item) => {
      const getImage = () => ({

        id: id++,
        description: newcards[item].description,
        UNKNOWN_SRC,
        src : newcards[item].src,
        visible : false
        
      })
      
      return [...result, getImage(), getImage()]
    }, [])
    return shuffle(images)
    
    
  }
  
  
  // render(){
  //   const cards =this.getcard()
  //   const renderCard = card => {
  //     const {src, UNKNOWN_SRC, visible} = card
  //     const img = visible ? src : UNKNOWN_SRC
  //     return (
  //       <div className="card">
  //         <img src={img} alt=""/>
  //       </div>
  //     )
  //   }
  
  // return <div className="app">
  //   <div className="CardBoard">
  //     {cards.map(renderCard)}
  //   </div>
  // </div>
  // }

  render(){
    const cards = this.getcard()
    return (
      <div className="memory">
        <CardBoard cards={cards} />
      </div>
    )
  }
 
}



