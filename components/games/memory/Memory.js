import React, {useState, useEffect} from 'react'

import Head from 'next/head'
import Link from 'next/link'

import MemoryCard from './MemoryCard'

import Style from '../../../styles/games/memory/memory.module.css'

let cardArray = [
    {
        name: 'fries',
        img: '/images/games/memory/french-fries.png',
        matched: false,
    },
    {
        name: 'hamburger',
        img: '/images/games/memory/hamburger.png',
        matched: false,
    },
    {
        name: 'hotdog',
        img: '/images/games/memory/hotdog.png',
        matched: false,
    },
    {
        name: 'milkshake',
        img: '/images/games/memory/milkshake.png',
        matched: false,
    },
    {
        name: 'ice-cream',
        img: '/images/games/memory/ice-cream-cone.png',
        matched: false,
    },
    {
        name: 'pizza',
        img: '/images/games/memory/pizza.png',
        matched: false,
    },
]

const Memory = () =>{
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choice1, setChoice1] = useState(null)
    const [choice2, setChoice2] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const [check, setCheck] = useState(0)
    const [lives, setLives] = useState(5)
    const [score, setScore] = useState(0)

    const shuffleCards = () => {
        const shuffledCards= [...cardArray, ...cardArray]
            .sort(()=>0.5-Math.random())
            .map((card) => ({...card, id: Math.random()}))
        setCards(shuffledCards)
                setChoice1(null)
        setChoice2(null)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choice1 ?   card === choice1 ? null: setChoice2(card) : setChoice1(card)
    }

    const resetTurn = () => {
        setChoice1(null)
        setChoice2(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        if (choice1 && choice2){
            setDisabled(true)
            if (choice1.name == choice2.name){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if( card.name === choice1.name){
                            return {...card, matched: true}
                        }else{
                            return card
                        }
                    })
                })
                
                resetTurn()
            }
            else{
                
                setTimeout( () =>resetTurn(), 1000) 
            }
        }
    }, [choice1, choice2])
    
    useEffect(() => {
        shuffleCards()
    }, [])
    

    return(
        <div className={Style.memory_container}>
            <Head>
                <title>jsgames</title>
                <meta name="memory matching game" content="in this game you flip cards to see what is underneath and to try and match with other cards" />
            </Head>
            <Link href={'/'}>
                <a>return home</a>
            </Link>
            <h1>Magic Match</h1>
            <h3>score: <span id='result'>{score}</span></h3>
            <h3>lives: <span id="lives">{lives}</span></h3>
            <div className={Style.card_grid}>
                {cards.map((card)=> (
                    <MemoryCard 
                        key={card.id}
                        card={card} 
                        handleChoice={handleChoice}
                        flipped={ card=== choice1 || card === choice2 || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <button className={Style.play_button} onClick={shuffleCards}>New Game</button>
        </div>
    )
}

export default Memory