import { useMemo } from "react";
import { parameters } from "../parameters";

const Particles = ({width = 15, height = 5, heightShift = 1, depth=10}) => {
    const count = 500
    const [positions] = useMemo(()=>{
        const positions = new Float32Array(count * 3)


        for(let i = 0; i < count; i++){
            positions[i * 3 + 0] = (Math.random() - 0.5) * width
            positions[i * 3 + 1] = heightShift + parameters.objectsDistance * 0.5 - Math.random() * parameters.objectsDistance * height
            positions[i * 3 + 2] = -depth + (Math.random() - 0.5) * 10
        }
        console.log('Positions: ')
        return [positions]
    })

    return(
        <points>
            <bufferGeometry>
                <bufferAttribute 
                    attach={"attributes-position"}
                    count = {positions.length/3}
                    itemSize = {3}
                    array = {positions}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                threshold={0.1}
                color={'#2b6c76'}
                sizeAttenuation={true}
            />
        </points>
    )
}

export default Particles