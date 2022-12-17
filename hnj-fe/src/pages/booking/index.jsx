import style from './style.module.scss'
import Navbar from '../../components/Navbar/navbar'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'

function BookingPage() {
    return (
        <div>
            <Navbar />
            <Spacer space={80} />
            <Spacer space={40} />
            <div className={style.container}>
                <div className={style.wrapper}>
                    <Text h1>{'Booking Page will update later :>'}</Text>
                </div>
            </div>
        </div>
    )
}

export default BookingPage
