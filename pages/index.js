import Head from 'next/head'
import Link from 'next/link'

import { Canvas } from '@react-three/fiber'

//objects
import Cone from '../components/portfolio/mesh/cone'
import Cube from '../components/portfolio/mesh/cube'
import Torus from '../components/portfolio/mesh/torus'
import TorusKnot from '../components/portfolio/mesh/torusKnot'

//config
import {parameters} from '../components/portfolio/parameters.js'
import Style from '../styles/portfolio/portfolio.module.css'

// utill
import Scroll from '../components/portfolio/util/scroll'
import Particles from '../components/portfolio/util/particles'


export default function Home() {

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={Style.nav_container}>
        <ul>
          <li>sites</li>
          <li><Link href="/games" ><a>Games</a></Link></li>
          <li><Link href={'/animations'}><a>Animations</a></Link></li>
          <li>contact</li>
        </ul>
      </div>
      <div className={Style.scene}>
        <Canvas className={Style.canvas} camera={{ position: [0, 0, 5], fov:35}}>
          <ambientLight intensity={10} />
          <pointLight position={[40, 40, 40]} intensity={20} />
            <Particles/>
          <Torus position={[2,parameters.objectsDistance * 0,0]}/>
          <Cone position={[-2,-parameters.objectsDistance * 1,0]}/>
          {/* <Cube position={[2,parameters * 0,0]}/> */}
          <TorusKnot position={[2,-parameters.objectsDistance * 2,0]}/>
          {/* <OrbitControls/> */}
          {/* <OrbitControls /> */}
          {/* <Dolly objectsDistance={parameters.objectsDistance}/> */}
      
          <Scroll/>
        </Canvas>
      </div>
        <section className={Style.section}>
          <h1>My Portfolio</h1>
        </section>
        <section className={Style.section}>
          <h1>My projects</h1>
        </section>
        <section className={Style.section}>
          <h1>Contact me</h1>
        </section>
    </div>


  )
}
