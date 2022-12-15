import style from './style.module.scss'
import Text from '../../Utils/text'
import { CiLocationOn } from 'react-icons/ci'

function CardItem({ imageUrl, title, descriptions, location, onPress }) {
    return (
        <div className={style.card} onClick={onPress}>
            <div className={style.image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={style.content}>
                <Text b>{title}</Text>
                {descriptions.map((description, index) => (
                    <Text key={index} helper>
                        {description}
                    </Text>
                ))}
                <div className={style.location}>
                    <CiLocationOn />
                    <Text helper>{location}</Text>
                </div>
            </div>
        </div>
    )
}

export default CardItem
