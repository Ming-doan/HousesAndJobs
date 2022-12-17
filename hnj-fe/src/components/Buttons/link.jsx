import style from './style.module.scss'

function Link({ message, onPress }) {
    return (
        <div className={style.link} onClick={onPress}>
            {message}
        </div>
    )
}

export default Link
