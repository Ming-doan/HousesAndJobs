import style from './style.module.scss'
import clsx from 'clsx'
import { BiCheck } from 'react-icons/bi'

function Checkbox({ isChecked, onChange, disabled, ...rest }) {
    return (
        <div
            className={clsx(style.checkbox, {
                [style.checked]: isChecked,
                [style.disabled]: disabled,
            })}
            onClick={!disabled ? onChange : null}
            {...rest}
        >
            {isChecked & !disabled ? (
                <BiCheck className={style.checkmark} />
            ) : null}
        </div>
    )
}

export default Checkbox
