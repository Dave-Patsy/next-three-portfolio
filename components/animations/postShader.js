import { useThree, useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import { EffectComposer, SMAA } from "@react-three/postprocessing"

const PostShader = () => {

    return(
        <EffectComposer multisampling={0}>
            <SMAA/>
        </EffectComposer>
    )

}   

export default PostShader