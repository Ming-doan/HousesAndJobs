import style from './style.module.scss'
import Navbar from '../../components/Navbar/navbar'
import Spacer from '../../components/Utils/spacer'

function RoommatePage() {
    return (
        <div>
            <Navbar />
            <Spacer space={80} />
            <div className={style.container}>
                <div className={style.wrapper}></div>
            </div>
        </div>
    )
}

export default RoommatePage
