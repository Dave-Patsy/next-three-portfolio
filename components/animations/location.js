import { useFrame, useLoader } from "@react-three/fiber"
import { MathUtils, TextureLoader } from "three"
import { BackSide } from "three"
import { coordinates } from './coordinates.js'
import Globe from "./globe.js"
import {  useRef, useEffect, useState } from "react"
import { Quaternion, Euler } from "three"
import gsap from "gsap"


function calcPosFromLatLonRad(lat,lon){
    var phi = (lat)*(Math.PI/180)
    var theta = (lon+180) * (Math.PI/180)
    let x = -(Math.cos(phi)*Math.cos(theta)) * 20
    let z = (Math.cos(phi)*Math.sin(theta)) * 20
    let y = Math.sin(phi) * 20

    return [x,y,z]
}

function calQuaternion(lat,lon){
    var phi = (lat)*(Math.PI/180)
    var theta1 = (270 - lon) * (Math.PI/180)
    let euler = new Euler(phi, theta1, 0, 'XYZ')
    let quaternion = new Quaternion().setFromEuler(euler)
    return quaternion
}


const Location = () =>{
    const locationTextuer = useLoader(TextureLoader,'/textures/locations/9dbceec6-e43d-40ed-a542-9e33782f3220_mucem.jpg')
    const groupRef = useRef()
    const [quaternion, setQuaternion] = useState([])
    useFrame((state, delta ) => {
        // groupRef.current.rotation.y += delta * 0.05
        // console.log(clock.getElapsedTime())
        // switch (clock % coordinates.length) {
        //     case 1:
        //         groupRef.current.quaternion.copy(quaternion[1])
        //         break;
        
        //     default:
        //         break;
        // }
    })

    useFrame(({clock})=>{
        const a = clock.getElapsedTime()
        // const b = clock.getDelta()
        let temptime = Math.floor((a/4)% coordinates.length)

        let animatedQuaternion = new Quaternion()
        let currectQuaternion = new Quaternion()
        
        let l = {p:0}

        switch (temptime) {
            case 0: 
                // groupRef.current.quaternion.copy(MathUtils.lerp(groupRef.current.quaternion,quaternion[0],1))
                currectQuaternion.copy(groupRef.current.quaternion)
                gsap.to(l,{
                    p:1,
                    duration: 1, 
                    onUpdate:()=>{
                        try{
                            animatedQuaternion.slerpQuaternions(currectQuaternion,quaternion[0],l.p)
                        } catch (e) {
                            // ignore error
                        }
                        groupRef.current.quaternion.copy(animatedQuaternion)
                    }
                })
               
                break;
            case 1:
                // groupRef.current.quaternion.copy(MathUtils.lerp(groupRef.current.quaternion,quaternion[0],1))
                currectQuaternion.copy(groupRef.current.quaternion)
                gsap.to(l,{
                    p:1,
                    duration: 1,
                    onUpdate:()=>{
                        try{
                            animatedQuaternion.slerpQuaternions(currectQuaternion,quaternion[1],l.p)
                        } catch (e) {
                            // ignore error
                        }
                        groupRef.current.quaternion.copy(animatedQuaternion)
                    }
                })
                break;
            case 2:
                // groupRef.current.quaternion.copy(MathUtils.lerp(groupRef.current.quaternion,quaternion[0],1))
                currectQuaternion.copy(groupRef.current.quaternion)
                gsap.to(l,{
                    p:1,
                    duration: 1,
                    onUpdate:()=>{
                        try{
                            animatedQuaternion.slerpQuaternions(currectQuaternion,quaternion[2],l.p)
                        } catch (e) {
                            // ignore error
                        }
                        groupRef.current.quaternion.copy(animatedQuaternion)
                    }
                })
                break;
            case 3:
                // groupRef.current.quaternion.copy(MathUtils.lerp(groupRef.current.quaternion,quaternion[0],1))
                currectQuaternion.copy(groupRef.current.quaternion)
                gsap.to(l,{
                    p:1,
                    duration: 1,
                    onUpdate:()=>{
                        try{
                            animatedQuaternion.slerpQuaternions(currectQuaternion,quaternion[3],l.p)
                        } catch (e) {
                            // ignore error
                        }
                        groupRef.current.quaternion.copy(animatedQuaternion)
                    }
                })
                break;
            default:
                break;
        }

    })
    
    useEffect(()=>{
        coordinates.map(coor =>{
            setQuaternion(quaternion => [...quaternion, calQuaternion(coor.coords.lat,coor.coords.lng)])
        })
        // console.log('quarternions: ', quaternion)
        return () =>{
            // console.log('quarternions: ', quaternion)
        }
    },[])
    
    return(
        <>
            <group ref={groupRef}>
                <Globe/>
                {
                    coordinates.map((coor, idx) =>{
                        

                        return(
                            <mesh key={idx} position={calcPosFromLatLonRad(coor.coords.lat,coor.coords.lng)}>
                                <sphereGeometry args={[.25,32,32]}/>
                                <meshStandardMaterial color={'red'}/>
                            </mesh>             
                        )
                    })
                }
            </group>
        </>



    )
}

export default Location