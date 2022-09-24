import {Link} from 'next/link'
import AnimationCanvas from '../../components/animations/animationScene'
import Style from '../../styles/transitions/animationPage.module.css'

import FinalScene from '../../components/animations/finalScene'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { useEffect } from 'react'
import {useAtom} from 'jotai'
import { locationsAtom } from '../../store'

const AnimationPage = () =>{

    const [locations, updateLocations] = useAtom(locationsAtom)

    return(
        <div className={Style.ani_page}>
            <div className={Style.bob}>
                <h1 className={Style.bob}>This will have cool animations</h1>
            </div>
            <ul>
                {
                    locations.locations.map((loc, idx) =>{
                        return <li key={idx} onClick={()=>updateLocations({...locations, selected:loc.texture})}>{loc.title}</li>
                    })
                }
            </ul>
            {/* <AnimationCanvas/> */}
            <Canvas>
                <FinalScene/>   
                <Stats/>
            </Canvas>
        </div>
    )
}

export default AnimationPage