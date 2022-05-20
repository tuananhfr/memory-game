import React from "react";
import '../assets/style/card.css';


export default class Card extends React.Component {
    constructor(props) {
      super(props);
    }

    render(){
        const  {src, UNKNOWN_SRC, visible,onClick} = this.props
        const img = visible ? src : UNKNOWN_SRC
        return (
          <div className="card" onClick={onClick} >
            <img src={img} alt=""/>
          </div>
        );
    }
}