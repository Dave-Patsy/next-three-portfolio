import ExitBeforeEntering from "../../components/spring/transition/exitBeforeEnter"
import ImageFade from "../../components/spring/transition/imageFade"
import ListReordering from "../../components/spring/transition/listReordering"
import Masonry from "../../components/spring/transition/masonry"
import MultistageTransition from "../../components/spring/transition/multistageTransition"
import NotificationMessage from "../../components/spring/transition/notificationMessage"
import Style from '../../styles/transitions/spring/transitionsPage.module.css'
import NotificationMessage2 from "../../components/spring/transition/notificationHub"
import SimpleTransitions from "../../components/spring/transition/simpleTransition"
import Chain from "../../components/spring/chain/chain"
import Card from "../../components/spring/spring/card/card"
import CssKeyframes from "../../components/spring/spring/cssKeyframes"
import CssVariable from "../../components/spring/spring/cssVariables"
import FlipCard from "../../components/spring/spring/flipCard"
import Slide from "../../components/spring/spring/slide"
import SvgFilter from "../../components/spring/spring/svgFilter"
import TreeList from "../../components/spring/spring/tree/Tree"
import AnimationAuto from "../../components/spring/spring/animationAuto"
import Viewpager from "../../components/spring/springs/viewpager"
// import DList from "../../components/spring/springs/draggableList/draggableList"
import CardStack from "../../components/spring/springs/cardStack"



const TransitionsPage = () => {
    return(
        <>
        <div className={Style.transition_page_wrapper}>
            <div className={Style.header_container}>
                <h1 className={Style.header}>Transitions</h1>
                {/* <hr ></hr> */}
            </div>
            <div className={Style.transition_wrapper}>
                <div className={Style.transition_container}>
                    <ListReordering/>
                </div>
                <div className={Style.transition_container}>
                    <MultistageTransition/>
                </div>
                <div className={Style.transition_container}>
                    <ImageFade/>
                </div>
                <div className={Style.transition_container}>
                    <Masonry/>
                </div>
                <div className={Style.transition_container}>
                    <ExitBeforeEntering/>
                </div>
                <div className={Style.transition_container}>
                    <NotificationMessage2/>
                </div>
                <div className={Style.transition_container}>
                    <SimpleTransitions/>
                </div>
            </div>
            <div className={Style.header_container}>
                <h1 className={Style.header}>Chains</h1>
                {/* <hr ></hr> */}
            </div>
            <div className={Style.transition_wrapper}>
                <div className={Style.transition_container}>
                    <Chain/>
                </div>
            </div>
            <div className={Style.header_container}>
                <h1 className={Style.header}>Spring</h1>
                {/* <hr ></hr> */}
            </div>
            <div className={Style.transition_wrapper}>
                <div className={Style.transition_container}>
                    <Card/>
                </div>
                <div className={Style.transition_container}>
                    <CssKeyframes/>
                </div>
                <div className={Style.transition_container}>
                    <CssVariable/>
                </div>
                <div className={Style.transition_container}>
                    <FlipCard/>
                </div>
                <div className={Style.transition_container}>
                    <Slide/>
                </div>
                <div className={Style.transition_container}>
                    <SvgFilter/>
                </div>
                <div className={Style.transition_container}>
                    <TreeList/>
                </div>
                <div className={Style.transition_container}>
                    <AnimationAuto/>
                </div>
            </div>
            <div className={Style.header_container}>
                <h1 className={Style.header}>Springs</h1>
                {/* <hr ></hr> */}
            </div>
            <div className={Style.transition_wrapper}>
                <div className={Style.transition_container}>
                    <Viewpager/>
                </div>
                <div className={Style.transition_container}>
                    <CardStack/>
                </div>
            </div>
        </div>
        </>
    )
}

export default TransitionsPage