
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { DoubleSide, TextureLoader, Vector4, Vector2 } from "three"
import { useSpring, a, easings, useSpringRef, useChain } from "@react-spring/three"
import "./videoMaterial"
import { useEffect, useMemo, useRef, useState } from "react"
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
// import { vertexShader, fragmentShader } from "./xVideoShader"
import { useAtom } from "jotai"
import { videoAtom,videoIndexAtom, videoPlayAtom } from "../../../videoStore"

const Video = () => {
    const {clock} = useThree()
    const shaderRef = useRef()

    const [index, setIndex] = useState(0)
    const vAtom = useAtom(videoAtom)
    const [viAtom, inc] = useAtom(videoIndexAtom)
    const [vpAtom, toggle] = useAtom(videoPlayAtom)
    const displacementAPI = useSpringRef()
    const {displacement} = useSpring({
        ref: displacementAPI,
        to: [
            {displacement: 0},
            {displacement: 1},
            {displacement:0},
        ],
        from: {displacement:0},
        config:{
            precision: 0.00001,
            duration: 2000,
            easing: easings.easeInOutQuint
        },
    })
    const progressAPI = useSpringRef()
    const {progress} =useSpring({
        ref:progressAPI,
        to:[
            {progress:0},
            {progress:1},
        ],
        from:{progress: 0},
        config:{
            precision: 0.00001,
            duration: 4000,
            easing: easings.easeInOutExpo            
        },
        onChange:() => console.log('onChange: ', progress.get()),
        onRest: ()=>{
            
            console.log('progress: ',progress.get())
            if(progress.get() == 1){
                progress.set(0)
                // progressAPI.stop()
                // inc(prev => prev+1)
                toggle(prev => true)
            }
        },
        onResolve: ()=> console.log('spring resolve: ',progress.get()),
        onDestroyed: ()=> console.log('spring destroyed: ',progress.get())
    })
    
    const textureStart = useLoader(TextureLoader, vAtom[0].map(video => video.start))
    const textureEnd = useLoader(TextureLoader, vAtom[0].map(video => video.end))
    // const texture1 = useLoader(TextureLoader,'/images/video/video-02-end.jpg')
    // const texture2 = useLoader(TextureLoader,'/images/video/video-02-first.jpg')

    const args = useMemo(()=>{
        return{
            wireframe: true,
            side: DoubleSide,
            extensions:{
                derivatives: '#extension GL_OES_standard_derivatives : enable'
            },
            uniforms:{
                time: {value: 0},
                t1: {value: textureEnd[(viAtom - 1) % textureEnd.length]},
                t2: {value: textureStart[(viAtom) % textureEnd.length]},
                distortion:{value: 0},
                progress: {value: 0},
                resolution: {value: new Vector4()},
                uvRate1:{
                    value: new Vector2(1,1)
                }
            },
            vertexShader,
            fragmentShader
        }
    },[textureStart,textureEnd,viAtom,vpAtom])

    const scale = 1.5
    useEffect(()=>{
        // console.log('viAtom: ', viAtom)
        if(vpAtom === false){
            console.log('start spring')
            displacementAPI.start()
            progressAPI.start()
        }
    },[vpAtom])

    useFrame(()=>{
        shaderRef.current.uniforms.time.value = clock.getElapsedTime()
        // displacementAPI.start()
    })

    return(
        <points>
            <planeGeometry args={[480 * scale,820 * scale,480*2,820*2]}/>
            {/* <videoMaterial t1={texture1} time={clock.getElapsedTime()}/> */}
            <a.shaderMaterial ref={shaderRef} attach='material' args={[args]} 
            // uniforms-time-value={progress}
            uniforms-distortion-value={displacement}
            uniforms-progress-value={progress}
            />
            {/* <pointsMaterial/> */}
        </points>
    )
}

export default Video