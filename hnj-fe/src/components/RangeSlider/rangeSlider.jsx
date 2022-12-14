import style from './style.module.scss'
import Spacer from '../Utils/spacer'

function RangeInput({ value, label, onChange }) {
    return (
        <div className={style.rangeInput}>
            <input type="number" value={value} onChange={onChange} />
            <div className={style.label}>{label}</div>
        </div>
    )
}

function RangeSlider({ min, max, value, onChange, label }) {
    return (
        <div className={style.rangeSlider}>
            <input
                type="range"
                className={style.slider}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
            <Spacer space={20} />
            <RangeInput value={value} onChange={onChange} label={label} />
        </div>
    )
}

export default RangeSlider
