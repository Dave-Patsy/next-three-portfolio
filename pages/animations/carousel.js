import { OrthographicCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Carousel from "../../components/carousel/Carousel"
import Style from '../../styles/transitions/carousel/carousel.module.css'



const CarouselPage = () => {
    const frustumSize = 1
    return(
        <div className={Style.canvas_container}>

            <Canvas className={Style.canvas}>
                <Suspense fallback={null}>

                    <OrthographicCamera
                        makeDefault={true}
                        position={[0,0,100]}
                        left={frustumSize/-2}
                        right={frustumSize/2}
                        top={frustumSize/2}
                        bottom={frustumSize/-2}
                        near={1}
                        far={1000}
                    />
                    <Carousel/>
                </Suspense>
         
            </Canvas>
        </div>
    )
}

export default CarouselPage