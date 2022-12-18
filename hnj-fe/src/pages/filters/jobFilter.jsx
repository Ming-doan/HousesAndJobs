import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSalaryRange, setIsPartTime } from './jobFilterReducer'
import RangeSlider from '../../components/RangeSlider/rangeSlider'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'
import Chip from '../../components/Chips/chip'
import { BsArrowRight } from 'react-icons/bs'

function JobFilter({ onClose }) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.jobFilter)

    return (
        <div className={style.sideContainer}>
            <Button auto variant="flat" onClick={onClose}>
                <BsArrowRight />
            </Button>
            <Spacer space={20} />
            <Text h4>Salary Range</Text>
            <Spacer space={10} />
            <RangeSlider
                min={500}
                max={6000}
                step={100}
                label={'k'}
                value={state.salaryRange}
                onChange={(e) => dispatch(setSalaryRange(e.target.value))}
            />
            <Spacer space={20} />
            <Text h4>Time</Text>
            <Spacer space={10} />
            <div className={style.flex}>
                <div className={style.option}>
                    <Chip
                        label="Full Time"
                        isSelected={!state.isPartTime}
                        onChange={() => dispatch(setIsPartTime(false))}
                    />
                </div>
                <div className={style.option}>
                    <Chip
                        label="Part Time"
                        isSelected={state.isPartTime}
                        onChange={() => dispatch(setIsPartTime(true))}
                    />
                </div>
            </div>
            <Spacer space={60} />
            <Button expanded>Apply Filter</Button>
        </div>
    )
}

export default JobFilter
