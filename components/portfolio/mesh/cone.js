import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Cone = (props) => {
    const mesh = useRef()

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state,delta) =>{
        mesh.current.rotation.x += delta*0.01
        mesh.current.rotation.y += delta*0.01
    })
    return(
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [2,2,2] : [1,1,1]}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <coneGeometry args={[1, 2, 32]}/>
            <meshStandardMaterial color={hovered ? '#2b6c76' : '#720b23'} wireframe={true}/>
        </mesh>
    )
} 

export default Cone