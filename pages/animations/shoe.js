import ShoeConfig from "../../components/shoeConfig/shoeConfig"
import Style from '../../styles/transitions/shoe/shoePage.module.css'

const Shoe = () => {
    return(
        <div className={Style.ShoeWrapper}>
            <ShoeConfig/>
        </div>
    )
}

export default Shoe