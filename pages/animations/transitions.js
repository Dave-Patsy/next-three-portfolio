import ListReordering from "../../components/spring/transition/listReordering"
import Style from '../../styles/transitions/spring/listReordering/listReorderingPage.module.css'
const TransitionsPage = () => {
    return(
        <div>
            <div className={Style.listReorderingContainer}>

                <ListReordering/>
            </div>
        </div>
    )
}

export default TransitionsPage