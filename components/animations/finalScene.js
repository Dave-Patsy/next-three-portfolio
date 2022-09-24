import { useMemo, useRef, useEffect, useState } from "react"

import {TextureLoader, BackSide, Scene, DoubleSide, WebGLRenderTarget, RGBAFormat, LinearFilter, Vector4 } from "three"
import { useFrame, useLoader, useThree, createPortal } from "@react-three/fiber"
import {OrbitControls, OrthographicCamera, PerspectiveCamera} from '@react-three/drei'

import {useControls} from 'leva'
import { locationsAtom } from "../../store.js"
import {useAtom} from 'jotai'


import "./FinalMaterial.js"


function calcPosFromLatLonRad(lat,lon){
    let radius = 13
    var phi = (lat)*(Math.PI/180)
    var theta = (lon+180) * (Math.PI/180)
    let x = -(Math.cos(phi)*Math.cos(theta)) * radius
    let z = (Math.cos(phi)*Math.sin(theta)) * radius
    let y = Math.sin(phi) * radius

    return [x,y,z]
}

function calQuaternion(lat,lon){
    var phi = (lat)*(Math.PI/180)
    var theta1 = (270 - lon) * (Math.PI/180)
    let euler = new Euler(phi, theta1, 0, 'XYZ')
    let quaternion = new Quaternion().setFromEuler(euler)
    return quaternion
}

const FinalScene = (props) =>{
    const { gl, scene, camera, size, clock } = useThree()
    
    const scene1 = useRef()
    const scene2 = useRef()
    const scene3 = useRef()
 
    const cam1 = useRef()
    const cam2 = useRef()
    const cam3 = useRef()

    const texture1 = useRef()
    const texture2 = useRef()

    const finalTextureRef = useRef()

    const [locations, updateLocations] = useAtom(locationsAtom)
    locations.locations.forEach((x) =>{
        console.log(x.texture)
    })
    console.log(locations.locations)
    // const locations = useMemo(() => useAtom(locationsAtom),[])
    
    const {progress} = useControls('progress',{
        progress:{
            value: 0,
            min: 0,
            max: 1,
            step: 0.001,
        }
    })
    
    // console.log(progress)

    var uniforms = {
        time: {value: 1},
        progress: {value: .9},
        scene360: {value: null},
        scenePlanet: {value: null}
    }

    

    const texture4 = new WebGLRenderTarget(
        size.width,
        size.height,
        {
            format: RGBAFormat,
            minFilter: LinearFilter,
            magFilter: LinearFilter
        }
    )
    const texture5 = new WebGLRenderTarget(
        size.width,
        size.height,
        {
            format: RGBAFormat,
            minFilter: LinearFilter,
            magFilter: LinearFilter
        }
    )

    const textureRef = useRef()
    const texture6 = useMemo(()=>{
        return(
            new WebGLRenderTarget(
                size.width,
                size.height,
                {
                    format: RGBAFormat,
                    minFilter: LinearFilter,
                    magFilter: LinearFilter
                }                
            )
        )
    })
    const frustumSize = 1
    const aspect = size.width / size.height

    const groupRef = useRef()


    const colorMap = useLoader(TextureLoader,'/textures/world.200412.3x5400x2700.jpg')
    const heightMap = useLoader(TextureLoader,'/textures/srtm_ramp2.worldx294x196.jpg')
    const locationTextuer = useLoader(TextureLoader, locations.selected)

    useFrame(()=>{
        const delta = clock.getElapsedTime()
        groupRef.current.rotation.y = delta * .1
        

    },1)
    useFrame(()=>{
        gl.setRenderTarget(texture4)
        gl.render(scene1.current, cam1.current)
        gl.setRenderTarget(texture5)
        gl.render(scene2.current, cam2.current)
        gl.setRenderTarget(null)
        gl.render(scene3.current, cam3.current)  
    },2)

    // useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene1.current, cam1.current)), 100)
    return(
        <>
        {/* create 360 */}
        <scene ref={scene1}>
            <ambientLight intensity={3}/>
            <PerspectiveCamera ref={cam1} makeDefault={false} position={[0, 0, 0.1]} fov={70} aspect={16/9} near={1} far={1000}/>
            <mesh>
                <sphereGeometry args={[2,32,32]}/>
                <meshStandardMaterial
                    map={locationTextuer}
                    side={BackSide}
                />
            </mesh>
        </scene>
        <OrbitControls camera={cam1.current} canvas={scene1.current}/>
        
        {/* create planet */}
        <scene ref={scene2}>
            <ambientLight intensity={15}/>
            <PerspectiveCamera ref={cam2} makeDefault={false} position={[0, 0, 30]} fov={70} aspect={16/9} near={1} far={1000}/>
            <group ref={groupRef}>
                <mesh>
                    <sphereGeometry args={[3,32,32]} />
                    <meshStandardMaterial 
                        map={colorMap}
                        displacementMap={heightMap}
                        displacementScale={.75}
                        displacementBias={10}
                    />
                </mesh>
                {
                    locations.locations.map((loc, idx) =>{
                        return(
                            <mesh key={idx} position={calcPosFromLatLonRad(loc.coords.lat,loc.coords.lng)}>
                                <sphereGeometry args={[.25,32,32]}/>
                                <meshStandardMaterial color={'red'}/>
                            </mesh>             
                        )
                    })
                }
                {/* {
                    coordinates.map((coor, idx) =>{
                        return(
                            <mesh key={idx} position={calcPosFromLatLonRad(coor.coords.lat,coor.coords.lng)}>
                                <sphereGeometry args={[.25,32,32]}/>
                                <meshStandardMaterial color={'red'}/>
                            </mesh>             
                        )
                    })
                } */}
            </group>
            
        </scene>
        {/* <OrbitControls camera={cam2.current} canvas={scene2.current}/> */}
        {/* create final scene */}
        <scene ref={scene3}>
            <pointLight position={[2,0,10]} intensity={3}/>
            <OrthographicCamera 
            ref={cam3} 
            makeDefault={false} 
            position={[0,0,100]} 
            left={frustumSize/ -2} 
            right={frustumSize/2} 
            top={frustumSize/2} 
            bottom={frustumSize/-2}
            near={1}
            far={1000} />

            <mesh>
                <planeGeometry args={[1,1]}/>
                <finalMaterial 
                    ref={finalTextureRef} 
                    progress={progress} 
                    scene360={texture4.texture}
                    scenePlanet={texture5.texture}
                />
                {/* <shaderMaterial
                    extensions={{derivatives: 'extension GL_OES_standard_derivatives : enable'}}
                    side={DoubleSide}
                    uniforms={uniforms}
                    
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                /> */}
            </mesh>
        </scene>
        {/* <texture6 ref={textureRef}/> */}
        {/* <OrbitControls camera={cam3.current} canvas={scene3.current}/> */}
        
        </>
    )
}

export default FinalScene