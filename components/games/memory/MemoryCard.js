
import React from 'react'
import Image from 'next/image'

import Style from '../../../styles/games/memory/memoryCard.module.css'


const MemoryCard = ({card,handleChoice,flipped,disabled}) =>{

    const handleClick = () =>{
        if(!disabled){
            handleChoice(card)
        }
    }

    return(
        <div className={Style.card} >             
            <div className={flipped? Style.flipped:''}>          
                <div className={`${Style.front_wrapper} ${Style.image_wrapper}`}>
                    <Image className="front" priority src={card.img} height={'64rem'} width={'64rem'} position={'absolute'} alt={'card front'} />
                </div>     
                <div className={`${Style.back_wrapper} ${Style.image_wrapper}`}>
                    <Image className="back" priority src={'/images/games/memory/rainbow.jpg'} height={'64rem'} width={'64rem'} position={'absolute'} any alt={'card back'} onClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}

export default MemoryCard