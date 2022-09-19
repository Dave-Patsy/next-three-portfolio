import React from 'react'
import Image from 'next/image'
import Style from '../../../styles/games/rps/choice.module.css'

const Choice = ({move,src,handleChoice}) => {
    const handleClick = () =>{
        handleChoice(move)
    }
    return(
        <button className={Style.rps_button} onClick={handleClick} >
            <Image className={Style.rps_img} priority src={src} height={'128rem'} width={'128rem'} alt={move} />
        </button>
    )
}

export default Choice