import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Boxes2 from "../../components/cubeArray/Boxes"
import Style from '../../styles/transitions/cubeArray/cubeArray.module.css'


const CubeArrayPage = () => {

    return(
        <div className={Style.canvas_container}>
            <Canvas camera={{position: [0, 0, 10] ,near: 0.1, far:1000} }>
                <Suspense fallback={null}>
                    <ambientLight />
                    <directionalLight position={[150, 150, 150]} intensity={0.55} />
                    {/* <Boxes /> */}
                    <Boxes2/>
                    {/* <FlyControls/> */}
                    <OrbitControls enablePan={false}/>w
                </Suspense>
            </Canvas>
        </div>
    )
}

export default CubeArrayPage