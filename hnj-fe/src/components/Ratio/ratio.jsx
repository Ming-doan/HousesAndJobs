import style from './style.module.scss'
import clsx from 'clsx'

function Ratio({ isChecked = true, onChange, disabled, ...rest }) {
    return (
        <div
            className={clsx(style.ratio, {
                [style.checked]: isChecked,
                [style.disabled]: disabled,
            })}
            onClick={!disabled ? onChange : null}
            {...rest}
        ></div>
    )
}

export default Ratio
