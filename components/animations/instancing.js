import { useRef,useEffect } from "react"
import * as THREE from 'three'

const Instances = ({ count = 100000, temp = new THREE.Object3D() }) => {
  const ref = useRef()
  useEffect(() => {
    // Set positions
    for (let i = 0; i < count; i++) {
      temp.position.set((Math.random()-.5) * 500, (Math.random()-.5) * 500, (Math.random()-.5) * 500)
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <boxGeometry />
      <meshPhongMaterial color={'red'}/>
    </instancedMesh>
  )
}

export default Instances