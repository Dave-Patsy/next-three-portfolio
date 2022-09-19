import Link from 'next/link'
import { useState } from 'react'
import Style from '../../styles/games/gamesPage.module.css'
import Circle from '../../components/games/circle/circle'

const GamePage = () => {

    const [toggle, setToggle] = useState(false)
    const handleClick = () =>{
        setToggle(toggle => !toggle)
    }

    return(
        <>
            <h1>this will be my game page</h1>
            <ul>
                <li><Link href={'/games/memory'}><a>to memory match</a></Link></li>
                <li><Link href={'/games/rps'}><a>to rock paper scissors</a></Link></li>
                <li><Link href={'/games/spaceship'}><a>spaceship game</a></Link></li>
                <li><Link href={'/games/snake'}><a>snake game</a></Link></li>
            </ul>
            <Link href={'/'}><a>Go to Homepage</a></Link>
            <div className={toggle? Style.test: Style.test2} onClick={handleClick}>hello</div>
            <div className={Style.circle_container}>

                <Circle/>   
            </div>
            
            
        </>
    )
} 

export default GamePage