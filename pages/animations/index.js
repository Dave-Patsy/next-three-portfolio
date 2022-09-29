import {Link} from 'next/link'
import AnimationCanvas from '../../components/animations/animationScene'
import Style from '../../styles/transitions/animationPage.module.css'

import FinalScene from '../../components/animations/finalScene'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { useEffect } from 'react'
import {useAtom} from 'jotai'
import { locationsAtom } from '../../store'
import PostShader from '../../components/animations/postShader'

const AnimationPage = () =>{

    const [locations, updateLocations] = useAtom(locationsAtom)

    useEffect(()=>{
        console.log(locations.selected)
    },[locations])
    return(
        <div className={Style.ani_page}>
            <div className={Style.nav_container}>
                <ul className={Style.loc_select}>
                    {
                        locations.locations.map((loc, idx) =>{
                            return <li className={Style.loc} key={idx} onClick={()=>updateLocations({...locations, selected:loc.texture})}>{loc.title}</li>
                        })
                    }
                </ul>
            </div>
            <div className={Style.canvas_container}>

                <Canvas className={Style.canvas} dpr={[1,2]}>
                    <FinalScene/>   
                    <Stats/>
                    <PostShader/>
                </Canvas>
            </div>
        </div>
    )
}

export default AnimationPage