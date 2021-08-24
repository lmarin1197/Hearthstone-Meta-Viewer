import React, {useEffect , useState} from 'react';
import {Link} from 'react-router-dom';
import '../css/Tierlist.css';

function Tierlist() {
  
    const [cards , setCards] = useState(null);
    const cardUrl = 'https://api.hearthstonejson.com/v1/88998/enUS/cards.collectible.json';
    const cardImgUrl = 'https://static.hsreplay.net/static/images/64x/class-icons/'
    let classIconUrls = []
    let heroImgUrls = []
    const deckContainerImgUrl = 'https://art.hearthstonejson.com/v1/256x/';
    //                           https://art.hearthstonejson.com/v1/256x/HERO_04d.jpg
    const cardLimit = 8;
    let cardArr = []
    let deckArr = [];
    let tierArr = [];
    // let fullCardIn = [];
    let cardClass = [];

    const getCard = (url) =>{
        fetch(url)
        .then(res => res.json())
        .then(res => {   
            let data = res;
            data.map(item => {
                item.image = `https://art.hearthstonejson.com/v1/tiles/${item.id}.jpg`;
                //"https://art.hearthstonejson.com/v1/tiles/DMF_238.jpg"----------------------CARD TILE ART
                //https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${item.id}.png---FULL CARD ART
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
    const cardIndex = () =>{
        let rand = Math.floor(Math.random() * (cards.length))
        // fullCardIn.push(rand)
        return rand;
    }
    if(cards == null){
        return null
    }
    
    else{
        console.log(cards.length)
        const renderTier = (tierNum , metaDecks) =>{           
            cards.map((e , i) => {    
                if(e.id.includes("HERO") ){
                    cardClass.push(e.cardClass);
                    classIconUrls.push(`${cardImgUrl}${e.cardClass}.png`.toLowerCase()) 
                    heroImgUrls.push(`${deckContainerImgUrl}${cards[i].id}.jpg`)
                }
            })
            for(let x = 0 ; x < cardLimit * metaDecks ; x++){
                cardArr.push(  
                    <div 
                        className = 'card-icon-image' 
                        style = {{backgroundImage: `url(${cards[cardIndex()].image})`}}
                        alt = ''
                    ></div>  
                )                        
                if( (x + 1) % cardLimit == 0){
                    deckArr.push(
                        <div className = 'deck-container'>       
                            <div className = 'img-container'>
                                <div >
                                    <img className ='deck-container-img' src= {heroImgUrls[x]} alt="" /> 
                                </div>
                                
                                <div >
                                    <img className = 'class-image-icon' src = {classIconUrls[x]} alt = ''/>  
                                </div>  
                            </div>

                            <div className = 'core-cards-and-icons'>
                                <span className = 'cards-text'>CORE CARDS</span>
                                <span className = 'card-icon-container' > {cardArr} </span>
                            </div>
                            <button className = 'view-deck'><Link to = {`/deck/${cardClass[x]}`} key = {cardClass[x]}>VIEW MOST POPULAR DECK</Link> </button>
                        </div>
                    )
                    cardArr = []
                }                 
      
            }
            tierArr.push(
                <div className = 'tier-container'>
                    <div className = 'tier-header' >tier {tierNum}</div>
                    {deckArr}
                </div>
            )
            deckArr = []            
        }
        renderTier(1 , 4)
        renderTier(2 , 3)
        renderTier(3 , 2)
        renderTier(4 , 3)
        return(
            <div className = 'tier-list' >
                {tierArr}
            </div>
        )    

    }
}

export default Tierlist;