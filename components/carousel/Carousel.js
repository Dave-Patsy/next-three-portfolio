import { useSpring, a } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import { useAtom } from "jotai"
import { useState,useEffect, useMemo } from "react"
import { RepeatWrapping, TextureLoader } from "three"
import { vertexShader, fragmentShader } from "./XPictureShader"

import "./PictureMaterial"

import { carouselAtom, pictureAtom } from "../../storeCarousel"
import { Loader } from "@react-three/drei"

const Carousel = () => {
    const [hovered, setHovered] = useState(false)
    const [direction, setDirection] = useState('right')
    const [intensity, setIntensity] = useState(.65)
    const {progress} = useSpring({progress: hovered? 1:0,onResolve:()=>{
        if(progress.get() === 1){
            progress.set(0)
            if(direction === 'right'){
                setCarousel1(prev => prev+1)
            } else {
                setCarousel1(prev => prev-1)
            }
            setHovered(prev=>false)
        }
    },onRest:()=>{
        // progress.set(0)
        // setCarousel1(prev => prev+1)
        // setHovered(prev=>false)
    }})
    const [pictures] = useAtom(pictureAtom)
    const [carousel, setCarousel1] = useAtom(carouselAtom)
    const texture = useLoader(TextureLoader,pictures.pictures.map((pic,idx)=>pic.src))
    const textureDisp = useLoader(TextureLoader, '/images/carousel/displacement/14.jpg')
    
    const arrowRMap = useLoader(TextureLoader,'/images/carousel/arrows/arrow.png')
    const arrowRAlpha = useLoader(TextureLoader,'/images/carousel/arrows/arrowAlpha.png')
    const arrowLMap = arrowRMap.clone()
    const arrowLAlpha = arrowRAlpha.clone()

    
    arrowLMap.wrapS = RepeatWrapping
    arrowLAlpha.wrapS = RepeatWrapping
    arrowLMap.repeat.x = -1
    arrowLAlpha.repeat.x = -1



    const args = useMemo(() => {
        console.log('first texture index: ',carousel % texture.length)
        console.log('second texture index: ',(carousel + 1) % texture.length)

        return {
        uniforms: {
            effectFactor: { type: 'f', value: intensity },
            dispFactor: { type: 'f', value: 0 },
            texture1: { type: 't', value: texture[Math.abs(  carousel )% texture.length] },
            texture2: { type: 't', value: texture[Math.abs((carousel+ 1) )% texture.length] },
            disp: { type: 't', value: textureDisp }
        },
        vertexShader,
        fragmentShader
        }
    }, [texture, textureDisp, intensity, carousel])
    
    console.log(carousel)
    return(
        <>
            <ambientLight intensity={6}/>
            <mesh 
                position={[0,0,0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                
                <planeGeometry args={[.8,.8]}/>
                <a.shaderMaterial attach="material" args={[args]} uniforms-dispFactor-value={progress} />

            </mesh>
            <mesh
                position={[0.44,0,1]}
                onClick={()=>{
                    setHovered(prev => true)
                    setDirection(prev => 'right')
                    setIntensity(prev => Math.abs(prev))
                }}
            >
                <planeGeometry args={[.125,.125]}/>
                <meshStandardMaterial
                    map={arrowRMap}
                    transparent={true}
                    alphaMap={arrowRAlpha}
                    color={'red'}
                    
                />
            </mesh>
            <mesh
                position={[-0.44,0,1]}
                onClick={()=>{
                    setHovered(prev => true)
                    setDirection(prev => 'left')
                    setIntensity(prev => Math.abs(prev)*-1)
                }}
            >
                <planeGeometry args={[.125,.125]}/>
                <meshStandardMaterial
                    map={arrowLMap}
                    transparent={true}
                    alphaMap={arrowLAlpha}
                    color={'red'}
                    
                />
            </mesh>
        </>
    )
}

export default Carousel