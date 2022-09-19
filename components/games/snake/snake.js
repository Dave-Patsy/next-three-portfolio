import { useEffect, useState } from "react"
import Style from '../../../styles/games/snake/snake.module.css'
import useInterval from '@use-it/interval';
import {TbLetterA,TbLetterS,TbLetterD,TbLetterW} from 'react-icons/tb'


const Snake = () => {
    const [head, setHead] = useState({x:5,y:5})
    const [snake, setSnake] = useState([55,65,75])
    const [tick, setTick] = useState(0)
    const [apple, setApple] = useState(22)
    const [direction, setDirection] = useState('up')
    const [lose, setLose] = useState(false)
    const [score, setScore] = useState(0)
    const width = 10
    const height = 10
    const grid = Array(100 - 1 + 1).fill().map((_, idx) => 1 + idx)
    // const choice = ['up','right','down','left']

    const chooseApple = () =>{
        let temp = []
        for(let i = 0; i< 100 ; i++){
            if(snake.includes(i) || i === (head.x + head.y*10-10)){
                // do nothing
                // break
            } else {
                temp.push(i)
            }
        }
        // console.log('this is temp: ', temp)
        let tempVal = temp[Math.floor(Math.random()* temp.length)]
        // console.log('this is tempVal: ', tempVal)
       
        return tempVal
    }

    const handleMove = () =>{
        let tempLose = false
        if(snake.includes(head.x + head.y*10-10)){
            console.log('head: ',head.x + head.y*10-20)
            console.log('snake :',snake)
            // setLose((prev) => !prev)
            tempLose = true
        }
        if(!lose && !tempLose){
            if(direction === 'up' ){
                if(head.y < 2){
                    setLose(true)
                }else{
                    if(head.x + head.y*10-20 === apple){
                       
                        setSnake([(head.x + (head.y*10 -10)),...snake])
                        setHead( {
                        ...head, 
                        y: head.y-1
                        })

                        setApple(chooseApple)
                        setScore((prev) => prev + 1)
                    } else{
                        
                        setSnake([(head.x + (head.y*10 -10)),...snake.slice(0,snake.length-1)])
                        setHead( {
                            ...head, 
                            y: head.y-1
                        })
                    }
                }
            } else if(direction === 'right'){
                if(head.x > 8){
                    setLose(true)
                }else{
             
                    if(head.x + 1 + head.y*10-10 === apple){
                        setSnake([(head.x + (head.y*10 -10)),...snake])
                        setHead( {
                            ...head, 
                            x: head.x+1
                        })
                        setApple(chooseApple)
                        setScore((prev) => prev + 1)
                    } else{

                        setSnake([(head.x + (head.y*10 -10)),...snake.slice(0,snake.length-1)])
                        setHead( {
                            ...head, 
                            x: head.x+1
                        })
                    }
                }
            } else if(direction === 'down' ){
                if(head.y > 9){
                    setLose(true)
                }else{
                    if(head.x + head.y*10 ===apple){
                        setSnake([(head.x + (head.y*10 -10)),...snake])
                        setHead( {
                            ...head, 
                            y: head.y+1
                        })
                        setApple(chooseApple)
                        setScore((prev) => prev + 1)
                    } else{

                        setSnake([(head.x + (head.y*10 -10)),...snake.slice(0,snake.length-1)])
                        setHead( {
                            ...head, 
                            y: head.y+1
                        })
                    }
                }
            } else if(direction === 'left'){
                if(head.x-1 < 0){
                    setLose(true)
                } else {
                    if(head.x -1 + head.y*10-10 === apple){
                        setSnake([(head.x + (head.y*10 -10)),...snake])
                        setHead( {
                            ...head, 
                            x: head.x-1
                        })
                        setApple(chooseApple)
                        setScore((prev) => prev + 1)
                    }else{

                        setSnake([(head.x + (head.y*10 -10)),...snake.slice(0,snake.length-1)])
                        setHead( {
                            ...head, 
                            x: head.x-1
                        })
                    }
                }
            }
        } else {
            console.log('you lose')
        }
        // setTick(tick+1)
    }
    useEffect(()=>{
        // handleMove()
    })



    
    useEffect(()=>{
        const handleClick = press =>{      
            if(press.key === 'w'){
                setDirection('up')
            } else if(press.key === 'd'){
                setDirection('right')
            } else if(press.key === 's'){
                setDirection('down')
            } else if(press.key === 'a'){
                setDirection('left')
            }
            // console.log(press.key)
        }

        window.addEventListener('keydown',handleClick)
        return () => {
            window.removeEventListener('keypress',handleClick)
        }
    })
    
    useInterval(handleMove, 500)

    return(
        <>
            <div className={Style.tile_grid}>
                {grid.map((ele,index)=>{
                    // console.log(index)
                    if(index == apple){
                        return(
                            <div className={Style.apple} key={index}></div>              
                        )
                    } else if(index == (head.x + (head.y-1) * 10)){
                        return(
                            <div className={Style.snake_head} key={index}></div>              
                        )
                        
                    } else if(snake.includes(index)){
                        return(
                            <div className={Style.snake} key={index}></div>              
                        )
                    } else{
                        return(
                            <div className={Style.tile} key={index}></div>              
                        )                        
                    }
                })}
            </div>
            <div className="UI">
                <h1>Score: {score}</h1>
                <div>
                    <TbLetterW className={Style.key}/>    
                    <TbLetterA className={Style.key}/>    
                    <TbLetterS className={Style.key}/>    
                    <TbLetterD className={Style.key}/>    
                </div>
            </div>
        </>
    )
}

export default Snake