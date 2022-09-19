import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Choice from './Choice'

import Style from '../../../styles/games/rps/rps.module.css'

const Rps = () => {
    // const [win, setWin] = useState(0)
    // const [loss, setLoss] = useState(0)
    const [move, setMove] = useState('')
    const [computer, setcomputer] = useState('')
    const [result, setResult] = useState('')
    
    const handleChoice = (choice)=>{
        const computerChoice=['rock','paper','scissor']
        const randomNumber = Math.floor(Math.random()*3)
        setMove(choice)
        setcomputer( computerChoice[randomNumber])
  
        if(computerChoice[randomNumber] === choice){
            setResult('Tie')
        }
        if(computerChoice[randomNumber] === 'rock' && choice === 'paper'){
            setResult('Win!')
        }
        if(computerChoice[randomNumber] === 'rock' && choice === 'scissors'){
            setResult('Lose')
        }
        if(computerChoice[randomNumber] === 'paper' && choice === 'rock'){
            setResult('Lose')
        }
        if(computerChoice[randomNumber] === 'paper' && choice === 'scissors'){
            setResult('Win!')
        }
        if(computerChoice[randomNumber] === 'scissor' && choice === 'rock'){
            setResult('Win!')
        }
        if(computerChoice[randomNumber] === 'scissor' && choice === 'paper'){
            setResult('Lose')
        }
    }

    return(
        <div className={Style.rps_container}>
            <Head>
                <title>Rock Paper Scissors</title>
                <meta name="Rock Paper Scissors" content="This is a rock paper scissors game" />
            </Head>
            
                
            <Link href={'/'}>
                <a>return home</a>
            </Link>   
            
            <h1>Rock Paper Scissors</h1>
            <h2>Computer Choice: <span id='computer-choice'>{computer}</span></h2>
            <h2>Your Choice: <span id='user-choice'>{move}</span></h2>
            <h2>Result: <span id='result'>{result}</span></h2>
            <div className={Style.button_choices}>

                <Choice move='rock' src='/images/games/rps/rock1.png' handleChoice={handleChoice}/> 
                <Choice move='paper' src='/images/games/rps/tissue-paper.png' handleChoice={handleChoice}/> 
                <Choice move='scissors' src='/images/games/rps/scissor.png' handleChoice={handleChoice}/> 
            </div>
                    
        </div>
        
    )
}
export default Rps