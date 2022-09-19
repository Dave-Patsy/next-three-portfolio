
import Head from 'next/head'
import GamesNav from './GamesNav'
import Styles from '../../styles/games/gamesLayout.module.css'



const GamesLayout = ({ children, title='Javascript Games'} ) =>(
 <>
    <Head>
        <title>{title}</title>
        <meta charSet='utf-8'/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={Styles.games_layout_container}>
        <GamesNav/>
        {children}
    </div>
 </>
)

export default GamesLayout