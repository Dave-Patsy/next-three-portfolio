import {Link} from 'next/link'
import AnimationCanvas from '../../components/animations/animationScene'
import Style from '../../styles/transitions/animationPage.module.css'
const AnimationPage = () =>{
    return(
        <div className={Style.ani_page}>
            <div className={Style.bob}>
                <h1 className={Style.bob}>This will have cool animations</h1>
            </div>
            <AnimationCanvas/>
        </div>
    )
}

export default AnimationPage