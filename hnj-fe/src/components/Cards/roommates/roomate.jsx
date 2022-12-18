import style from './style.module.scss'
import Spacer from '../../Utils/spacer'
import Text from '../../Utils/text'
import { HiLocationMarker } from 'react-icons/hi'

const TextEllipsis = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

function RoomateCard({ avatar, name, descriptions, location, slot }) {
    return (
        <div className={style.card}>
            <div className={style.user}>
                <div className={style.avatar}>
                    <img src={avatar} alt="" />
                </div>
                <Spacer space={10} />
                <Text>{name}</Text>
            </div>
            <Spacer space={20} />
            <div className={style.info}>
                {descriptions.map((description, index) => (
                    <Text helper style={TextEllipsis} key={index}>
                        {description}
                    </Text>
                ))}
                <Spacer space={20} />
                <Text helper color={'gray900'}>
                    {slot} slot remaining
                </Text>
                <Spacer space={20} />
                <Text helper color={'gray900'}>
                    <HiLocationMarker />
                    {location}
                </Text>
            </div>
        </div>
    )
}

export default RoomateCard
