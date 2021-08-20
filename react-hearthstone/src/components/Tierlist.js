import React, {useEffect , useState} from 'react';

function Tierlist(props) {
  
    const [cards , setCards] = useState(null);
    const cardUrl = 'https://api.hearthstonejson.com/v1/88998/enUS/cards.collectible.json';
    const cardImgUrl = 'https://static.hsreplay.net/static/images/64x/class-icons/'
    let classIconUrls = []
    let heroImgUrls = []
    const deckContainerImgUrl = 'https://art.hearthstonejson.com/v1/256x/';
    //                           https://art.hearthstonejson.com/v1/256x/HERO_04d.jpg
    const cardLimit = 8 , metaDecks = 5;
    let cardArr = []
    let deckArr = [];
    let tierArr = [];

    const getCard = (url) =>{
        fetch(url)
        .then(res => res.json())
        .then(res => {   
            let data = res;
            data.map(item => {
                item.image = `https://art.hearthstonejson.com/v1/tiles/${item.id}.jpg`;
                //"https://art.hearthstonejson.com/v1/tiles/DMF_238.jpg"----------------------FULL CARD ART
                //https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${item.id}.png---CARD TILE ART
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
        
    if(cards == null){
        return null
    }
    
    else{
        const renderTier = (tierNum) =>{
            cards.map((e , i) => {
                if(e.id.includes("HERO")){
                    classIconUrls.push(`${cardImgUrl}${e.cardClass}.png`.toLowerCase()) 
                    heroImgUrls.push(`${deckContainerImgUrl}${cards[i].id}.jpg`)
                    console.log(heroImgUrls[0])
                }
            })
            for(let x = 0 ; x < cardLimit * metaDecks ; x++){
                cardArr.push(  
                    <div 
                        className = 'card-icon-image' 
                        style = {{backgroundImage: `url(${cards[Math.floor(Math.random() * (cards.length))].image})`}}
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
                                {/* <div className = 'deck-container-img'>style = {{backgroundImage: `url(${heroImgUrls[x]})`}}</div> */}
                                <div >
                                    <img className = 'class-image-icon' src = {classIconUrls[x]} alt = ''/>  
                                </div>  
                            </div>

                            <div className = 'core-cards-and-icons'>
                                <span className = 'cards-text'>CORE CARDS</span>
                                <span className = 'card-icon-container' > {cardArr} </span>
                            </div>
                            <button className = 'view-deck'>VIEW MOST POPULAR DECK</button>
                        </div>
                    )
                    cardArr = []
                }                 
      
            }
            tierArr.push(
            <div className = 'tier-container'>
                <div className = 'tier-header' >tier {tierNum}</div>
                {deckArr}
            </div>)
            deckArr = []            
        }
        renderTier(1)
        renderTier(2)
        renderTier(3)
        renderTier(4)
        return(
            <div 
                className = 'tier-list'
            >
                {tierArr}
            </div>
                //{deckArr} 
                
        )    
        // {/* <div className = 'card-icon-container' > {cardArr} </div> */}    
    }
}

export default Tierlist;