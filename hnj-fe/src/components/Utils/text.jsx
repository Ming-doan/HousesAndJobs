import style from './style.module.scss'
import clsx from 'clsx'

function Text({ b, h1, h2, h3, h4, helper, children, color, ...rest }) {
    return (
        <span
            className={clsx(style.text, {
                [style.b]: b,
                [style.h1]: h1,
                [style.h2]: h2,
                [style.h3]: h3,
                [style.h4]: h4,
                [style.helper]: helper,
            })}
            style={color ? { color: `var(--${color})` } : null}
            {...rest}
        >
            {children}
        </span>
    )
}

export default Text
