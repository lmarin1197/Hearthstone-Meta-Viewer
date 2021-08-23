import React from 'react';
import Tierlist from './Tierlist';

function Decklist(props) {
    let card = [];
    let url = props.match.params.cardClass;
    console.log(url);
    // match = {match}
    for(let i = 0; i < 30 ; i++){
        card.push(
            <div className = 'card'>Card {i+1}</div>
        )
    }
    return (
        <div className = 'deck-list'>
            {/* <Tierlist match = {match}/> */}
            {card}
        </div>
    );
}

export default Decklist;