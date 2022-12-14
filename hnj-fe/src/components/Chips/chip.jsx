import style from './style.module.scss'
import clsx from 'clsx'

function Chip({ label, isSelected, onChange, ...rest }) {
    return (
        <div
            className={clsx(style.chip, {
                [style.selected]: isSelected,
            })}
            onClick={onChange}
            {...rest}
        >
            {label}
        </div>
    )
}

export default Chip
