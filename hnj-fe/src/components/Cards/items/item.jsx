import style from './style.module.scss'
import Text from '../../Utils/text'
import { CiLocationOn } from 'react-icons/ci'

const TextEllipsis = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

function CardItem({ imageUrl, title, descriptions, location, onPress }) {
    return (
        <div className={style.card} onClick={onPress}>
            <div className={style.image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={style.content}>
                <Text b style={TextEllipsis}>
                    {title}
                </Text>
                {descriptions.map((description, index) => (
                    <Text key={index} helper style={TextEllipsis}>
                        {description}
                    </Text>
                ))}
                <div className={style.location}>
                    <CiLocationOn />
                    <Text helper style={TextEllipsis}>
                        {location}
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default CardItem
