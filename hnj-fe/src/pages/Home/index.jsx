import style from './style.module.scss'
import Navbar from '../../components/Navbar/navbar'

function Home({ feed, isAuth }) {
    return (
        <div>
            <Navbar isAuth={isAuth} />
            <div className={style.searchBox}>
                <div className={style.content}></div>
                <div className={style.decoration}></div>
            </div>
            <div className={style.container}>
                <div className={style.content}></div>
            </div>
        </div>
    )
}

export default Home
