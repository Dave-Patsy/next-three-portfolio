import Link from "next/link"
import Style from '../../styles/games/gamesNav.module.css'

const GamesNav = () =>{
    return(
            <div className={Style.nav_container}>
                <ul className={Style.nav_links}>
                    <li>
                        <Link href={'/games'}>
                            <a className={Style.nav_link} >return to games page</a>
                        </Link>
                    </li>
                </ul>
                <ul className={Style.nav_links_container}>
                    <li className={Style.nav_links}>
                        <Link href={'/games/memory'}>
                            <a className={Style.nav_link} >Memory Matching</a>
                        </Link>
                    </li>
                    <li className={Style.nav_links}>
                        <Link href={'/games/rps'}>
                            <a className={Style.nav_link} >Rock Paper Scissors</a>
                        </Link>
                    </li>

                </ul>
            </div>
    )
}

export default GamesNav