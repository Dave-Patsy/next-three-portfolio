import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { Suspense, useEffect, useRef, useState } from "react"
import Video from "../../components/animations/videoTransition/video"
import gsap from "gsap"

import styles from '../../styles/video/videoPage.module.css'
import { useAtom } from "jotai"
import { videoAtom, videoIndexAtom, videoPlayAtom } from "../../videoStore"
const VideoPage = () => {
    const videoRef = useRef()
    const vAtom = useAtom(videoAtom)
    const [viAtom, inc] = useAtom(videoIndexAtom)
    const [vpAtom, toggle] = useAtom(videoPlayAtom)
    const [index, setIndex] = useState(0)


    useEffect(()=>{
        const handleEnd = event => {
            console.log('video ended')
            gsap.to(videoRef.current,{
                duration:0.001,
                opacity:0,
                onComplete:()=>{
                    // inc(prev =>prev+1)
                    toggle(false)
                    console.log('gsap has completed')
                }
            })
        }

        videoRef.current.addEventListener('ended',handleEnd)

        return () => videoRef.current.removeEventListener('ended',handleEnd)
    },[])

    useEffect(()=>{
        if(vpAtom === true){

            videoRef.current?.load()
            // inc(prev =>prev+1)
            gsap.to(videoRef.current,{
                duration: 0.000001,
                opacity:1,
                onComplete:()=>{
                    videoRef.current?.play()
                    inc(prev =>prev+1)
                }
            })
        }
    }, [vpAtom])

    return(
        <div className={styles.videoPageWrapper}>
            <div className={styles.videoWrapper}>
                <video ref={videoRef} className={styles.video} muted>
                    <source src={vAtom[0].at(viAtom % (vAtom[0].length)).src}/>
                </video>
            </div>
            <Canvas camera={{position:[0,0,1500], far:10000}}>
                <Suspense fallback={null}>
                    <fog color={'#126564'} near={.1} far={20}/>
                    <fogExp2 color={'#000000'} density={1000.0}/>
                    <ambientLight />
                    <Video/>
                    {/* <OrbitControls/> */}
                    {/* <EffectComposer>
                        <Bloom luminanceThreshold={.8} luminanceSmoothing={.5} radius={.2} intensity={2} opacity={.5}/>

                    </EffectComposer> */}
                </Suspense>
            </Canvas>
        </div>
    )
}

export default VideoPage