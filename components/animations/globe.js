import { TextureLoader } from "three"
import { useLoader } from "@react-three/fiber"


const Globe = () =>{
    const colorMap = useLoader(TextureLoader,'/textures/world.200412.3x5400x2700.jpg')
    const heightMap = useLoader(TextureLoader,'/textures/srtm_ramp2.worldx294x196.jpg')
    return(
        <mesh>
            <sphereGeometry args={[10,1024,1024]} />
            <meshStandardMaterial 
                map={colorMap}
                displacementMap={heightMap}
                displacementScale={.75}
                displacementBias={10}
            
            />
            {/* <shaderMaterial/> */}
        </mesh>
    )
}

export default Globe