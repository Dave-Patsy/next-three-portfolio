import { useLayoutEffect, useMemo, useRef, useState } from "react"
import niceColors from 'nice-color-palettes'
import * as THREE from 'three'

const length = 125000
const o = new THREE.Object3D()
const c = new THREE.Color()
const colors = Array.from({ length }, () => niceColors[98][Math.floor(Math.random() * 5)])

const Boxes2 = () => {
  const ref = useRef()
  const [colorArray] = useState(() => Float32Array.from(Array.from({ length }, (_, i) => c.set(colors[i]).convertSRGBToLinear().toArray()).flat()))

  useLayoutEffect(() => {
    let i = 0
    for (let x = 0; x < 50; x++)
      for (let y = 0; y < 50; y++)
        for (let z = 0; z < 50; z++) {
          const id = i++
          o.position.set(25 - x, 25 - y, 25 - z)
          o.updateMatrix()
          ref.current.setMatrixAt(id, o.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, length]}>
      <boxBufferGeometry  args={[0.15, 0.15, 0.15]}>
        <instancedBufferAttribute attach="attributes-color"  count={colorArray.length / 3} array={colorArray} itemSize={3} />
      </boxBufferGeometry>
      <meshLambertMaterial vertexColors={true} toneMapped={false} />
    </instancedMesh>
  )
}

export default Boxes2