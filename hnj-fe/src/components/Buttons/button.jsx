import style from './style.module.scss'
import Spacer from '../Utils/spacer'

const variantsSetting = {
    default: {
        color: 'var(--gray100)',
        backgroundColor: 'var(--primary)',
        border: 'none',
    },
    outline: {
        color: 'var(--gray900)',
        backgroundColor: 'transparent',
        border: '1px solid var(--gray900)',
    },
    flat: {
        color: 'var(--gray900)',
        backgroundColor: 'var(--gray200)',
        border: 'none',
    },
}

function Button({
    icon,
    message,
    variant = 'default',
    auto,
    onClick,
    ...rest
}) {
    return (
        <button
            className={style.container}
            onClick={onClick}
            style={{
                ...variantsSetting[variant],
                width: auto ? 'fit-content' : 'var(--default-width)',
            }}
            {...rest}
        >
            <div
                className={style.content}
                style={{
                    color: variantsSetting[variant].color,
                }}
            >
                {icon}
                <Spacer space={10} />
                {message}
            </div>
        </button>
    )
}

export default Button
