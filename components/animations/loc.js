import { useState } from "react"


function calcPosFromLatLonRad(lat,lon){
    let radius = 3
    var phi = (lat)*(Math.PI/180)
    var theta = (lon+180) * (Math.PI/180)
    let x = -(Math.cos(phi)*Math.cos(theta)) * radius
    let z = (Math.cos(phi)*Math.sin(theta)) * radius
    let y = Math.sin(phi) * radius

    return [x,y,z]
}

const Loc = ({lat, lng}) =>{
    const [hovered, setHovered] = useState(false)
    return(
        <mesh 
            position={calcPosFromLatLonRad(lat,lng)}
            onPointerEnter={()=> setHovered(true)}
            onPointerLeave={()=> setHovered(false)}

        >
            <sphereGeometry args={[.10,32,32]}/>
            <meshStandardMaterial color={hovered ? '#2b6c76' : '#720b23'}/>
        </mesh>         
    )
}

export default Loc