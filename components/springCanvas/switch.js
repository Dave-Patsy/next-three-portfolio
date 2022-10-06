import { useState } from "react"
import { useSpring } from "@react-spring/three"
import { a } from "@react-spring/web"
import BallScene from "./ballScene"

import Style from '../../styles/transitions/springCanvas/ballSwitch.module.css'

const BallSwitch = () =>{
  const [toggle, set] = useState(0)
  // Set up a shared spring which simply animates the toggle above
  // We use this spring to interpolate all the colors, position and rotations
  const [{ x }] = useSpring({ x: toggle, config: { mass: 10, tension: 1500, friction: 100, precision: 0.0001 } }, [toggle])
  return (
    <a.div className={Style.container} style={{ backgroundColor: x.to([0, 1], ["#c9ffed", "#ff2558"]), color: x.to([0, 1], ["#7fffd4", "#13f88f"]) }}>
      <h1 className={`${Style.open}  ${Style.h1}`} children="<h1>" />
      <h1 className={`${Style.close}  ${Style.h1}`} children="</h1>" />
      <a.h1 className={`${Style.h1}`}>{x.to((x) => (x + 8).toFixed(2))}</a.h1>
      <BallScene x={x} set={set} />
    </a.div>
  )   
}

export default BallSwitch