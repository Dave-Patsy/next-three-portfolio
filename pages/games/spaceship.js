import GamesLayout from "../../components/games/GamesLayout"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import ArWing from "../../components/games/spaceship/arWing"
import Terrain from "../../components/games/spaceship/terrain"
import Target from "../../components/games/spaceship/target"
import Lasers from "../../components/games/spaceship/lasers"
import LaserController from "../../components/games/spaceship/laserController"
import Enemies from "../../components/games/spaceship/enemies"
import Loading from "../../components/games/spaceship/loading"
import Style from '../../styles/games/spaceship/spaceship.module.css'
import { OrbitControls } from "@react-three/drei";
import { RecoilRoot } from 'recoil'
import GameTimer from "../../components/games/spaceship/gameTimer"

const SpaceGamePage = () => {
    return(
        <>
        <GamesLayout>
            <div className={Style.scene}> 
                    <Canvas style={{ background: "#171717" }}>
                        <RecoilRoot>
                            <directionalLight intensity={0.5} />
                            <Suspense fallback={<Loading />}>
                                <ArWing />
                            </Suspense>
                            <Target/>
                            <Enemies/>
                            <Lasers/>
                            <Terrain/>
                            <OrbitControls/>
                            <LaserController />
                            <GameTimer/>
                        </RecoilRoot>
                    </Canvas>
            </div>
        </GamesLayout>
        </>
    )
}

export default SpaceGamePage