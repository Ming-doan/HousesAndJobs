import style from './style.module.scss'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setPriceRange,
    setNumberOfBed,
    setNumberOfToilet,
    setCookingSection,
    setBalcony,
    setWashingMachine,
} from './reducer'
import RangeSlider from '../../components/RangeSlider/rangeSlider'
import Button from '../../components/Buttons/button'
import Spacer from '../../components/Utils/spacer'
import Text from '../../components/Utils/text'
import Chip from '../../components/Chips/chip'
import Checkbox from '../../components/Checkbox/checkbox'
import { BsArrowRight } from 'react-icons/bs'
import { bedOptions, toiletOptions } from './filterOptions'

function HomeFilter({ onClose }) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.filter)

    return (
        <div className={style.sideContainer}>
            <Button auto variant="flat" onClick={onClose}>
                <BsArrowRight />
            </Button>
            <Spacer space={20} />
            <Text h4>Price Range</Text>
            <Spacer space={10} />
            <RangeSlider
                min={500}
                max={6000}
                step={100}
                label={'k'}
                value={state.priceRange}
                onChange={(e) => dispatch(setPriceRange(e.target.value))}
            />
            <Spacer space={20} />
            <Text h4>Number of Bed</Text>
            <Spacer space={10} />
            <div className={style.flex}>
                {bedOptions.map((item, index) => {
                    return (
                        <div className={style.option} key={index}>
                            <Chip
                                label={item.label}
                                isSelected={state.numberOfBed === item.value}
                                onChange={() =>
                                    dispatch(setNumberOfBed(item.value))
                                }
                            />
                            <Spacer space={10} />
                        </div>
                    )
                })}
            </div>
            <Spacer space={20} />
            <Text h4>Number of Toilet</Text>
            <Spacer space={10} />
            <div className={style.flex}>
                {toiletOptions.map((item, index) => {
                    return (
                        <div className={style.option} key={index}>
                            <Chip
                                label={item.label}
                                isSelected={state.numberOfToilet === item.value}
                                onChange={() =>
                                    dispatch(setNumberOfToilet(item.value))
                                }
                            />
                            <Spacer space={10} />
                        </div>
                    )
                })}
            </div>
            <Spacer space={20} />
            <Text h4>Funitures</Text>
            <Spacer space={10} />
            {/* Cooking Section */}
            <div className={style.flex}>
                <Checkbox
                    isChecked={state.cookingSection}
                    onChange={() =>
                        dispatch(setCookingSection(!state.cookingSection))
                    }
                />
                <Spacer space={10} />
                <Text>Cooking Section</Text>
            </div>
            <Spacer space={10} />
            {/* Balcony */}
            <div className={style.flex}>
                <Checkbox
                    isChecked={state.balcony}
                    onChange={() => dispatch(setBalcony(!state.balcony))}
                />
                <Spacer space={10} />
                <Text>Balcony</Text>
            </div>
            <Spacer space={10} />
            {/* Washing Machine */}
            <div className={style.flex}>
                <Checkbox
                    isChecked={state.washingMachine}
                    onChange={() =>
                        dispatch(setWashingMachine(!state.washingMachine))
                    }
                />
                <Spacer space={10} />
                <Text>Washing Machine</Text>
            </div>
            <Spacer space={10} />
        </div>
    )
}

export default HomeFilter
