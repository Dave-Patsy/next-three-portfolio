import '../styles/globals.css'
import Style from '../styles/portfolio/portfolio.module.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <div className={Style.nav_container}>
        <ul>
          <li><Link href="/" ><a>Home</a></Link></li>
          <li>Sites</li>
          <li><Link href="/games" ><a>Games</a></Link></li>
          <li><Link href={'/animations'}><a>Animations</a></Link></li>
          <li>Contact</li>
        </ul>
      </div>
      <Component {...pageProps} />
    </>
  )
    
}

export default MyApp
