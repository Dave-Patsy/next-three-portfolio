import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'

import Globe from "./globe";
import Location from "./location";
import Instances from "./instancing";

import { coordinates } from "./coordinates";

import Style from '../../styles/transitions/animationCanvas.module.css'

// import { context } from "@react-three/fiber";

// const locationContext = createContext('')

const AnimationCanvas = () =>{
    return(
        
        <div className={Style.container}>
            <ul>
                { coordinates.map(coor =>{
                    return <li key={coor.title}>{coor.title}</li>
                })}
            </ul>
            {/* <locationContext.Provider> */}

                <Canvas camera={{ position: [0, 0, 50], fov:75, near:1,far:1000 }}>
                    <ambientLight intensity={3}/>
                    {/* <pointLight position = {[30,30,30]} intensity={10}/> */}
                    {/* <Globe/> */}
                    <Location/>
                    {/* <Instances/> */}
                    {/* <mesh>
                    </mesh> */}
                    <OrbitControls/>
                </Canvas>
            {/* </locationContext.Provider> */}
        </div>
        
    )
}

export default AnimationCanvas