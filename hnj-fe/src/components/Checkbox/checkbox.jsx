import style from './style.module.scss'

function Checkbox({ isChecked }) {
    return (
        <div className={style.checkbox}>
            <input type="checkbox" checked={isChecked} />
            <span className="checkbox__checkmark" />
        </div>
    )
}

export default Checkbox
