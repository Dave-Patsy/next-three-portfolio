import SimpleScene from "../../components/simpleScene/simpleScene"
import Style from '../../styles/transitions/simpleScene/simpleScenePage.module.css'

const SimpleScenePage = () => {
    return(
        <div className={Style.simpleWrapper}>
            <SimpleScene/>
        </div>
    )
}

export default SimpleScenePage