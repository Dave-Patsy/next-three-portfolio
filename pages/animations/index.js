import ExitBeforeEntering from "../../components/spring/transition/exitBeforeEnter"
import ImageFade from "../../components/spring/transition/imageFade"
import ListReordering from "../../components/spring/transition/listReordering"
import Masonry from "../../components/spring/transition/masonry"
import MultistageTransition from "../../components/spring/transition/multistageTransition"
import NotificationMessage from "../../components/spring/transition/notificationMessage"
import Style from '../../styles/transitions/spring/transitionsPage.module.css'
import NotificationMessage2 from "../../components/spring/transition/notificationHub"
import SimpleTransitions from "../../components/spring/transition/simpleTransition"


const TransitionsPage = () => {
    return(
        <>
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
        </>
    )
}

export default TransitionsPage