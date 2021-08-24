import React from 'react';
import Tierlist from './Tierlist';
import {useEffect, useState} from 'react';
import '../css/Decklist.css'
function Decklist(props) {
 
    const [cards , setCards] = useState(null);
    
    const cardUrl = 'https://api.hearthstonejson.com/v1/88998/enUS/cards.collectible.json';
    let cardArr = [];   //    common                  rare                  epic                legendary
    const cardRarity = ['rgb(153, 153, 153)' , 'rgb(56, 95, 136)' , 'rgb(115, 87, 149)' , 'rgb(153, 106, 43)']
    let cardIn;
    let colorIn;
    const cardClass = props.match.params.id;

    const getCard = (url) =>{
        fetch(url)
        .then(res => res.json())
        .then(res => {   
            let data = res;
            data.map(item => {
                item.image = `https://art.hearthstonejson.com/v1/tiles/${item.id}.jpg`;
                //"https://art.hearthstonejson.com/v1/tiles/DMF_238.jpg"----------------------CARD TILE ART
            })
            setCards(data)
        })
        .catch(err => {
            console.error(err);
        });        
    }    
    useEffect(() => {
        getCard(cardUrl)
    },[])
    let card = [];
    if(cards == null){
        return null;
    }
    else{
        // console.log(cards[0]) //LOGS THE CLASS
        for(let i = 0 ; cardArr.length < 17 ; i++){
            cardIn = (Math.floor(Math.random()* 3000));
            if(cards[cardIn].hasOwnProperty("cardClass")){
                if(cards[cardIn].cardClass == cardClass && !cards[cardIn].id.includes('HERO')){
                    cardArr.push(cards[cardIn]);
                }
            }

        }
        console.log(cardArr)
        for(let i = 0; i < cardArr.length ; i++){
            switch(cardArr[i].rarity){
                case 'COMMON':
                    colorIn = 0;
                    break;
                case 'RARE':
                    colorIn = 1;
                    break;
                case 'EPIC':
                    colorIn = 2
                    break;
                case 'LEGENDARY':
                    colorIn = 3;
                    break;
                default:
                    console.log('NO RARITY FOUND')
            }
            
            card.push(
                <div className = 'card-list'>
                    <div className = 'card-details'>
                        <div className = 'card-mana' style = {{backgroundColor: cardRarity[colorIn]}}>
                            <span className = 'card-mana-text'>{cardArr[i].cost}</span>
                        </div>
                        
                                <a href = {`https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${cardArr[i].id}.png`}><img 
                                className = 'card-img' 
                                src = {`https://art.hearthstonejson.com/v1/tiles/${cardArr[i].id}.jpg`} 
                                alt="" 
                                style = {{}}
                            /></a>

                        
                            <span className = 'card-amount'><div className = 'card-amount-text'>2</div></span>
                        
                    </div>
                    
                    <div className = 'card'>
                        {cardArr[i].name}
                    </div>
                </div>
            )
        }    
        return (
            <div className = 'deck-list'>
                <div className = 'deck-header'>{props.match.params.id}</div>
                <div className = 'deck-header' id = 'header-table'>Cost <span id = 'amount'>Amount</span><span id = 'name'>name</span></div>
                {card}
            </div>
        );
        

    }

}

export default Decklist;