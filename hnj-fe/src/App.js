import './App.css'
import { useState } from 'react'
import Input from './components/Inputs/input'
import Button from './components/Buttons/button'
import Ratio from './components/Ratio/ratio'
import Checkbox from './components/Checkbox/checkbox'
import Chip from './components/Chips/chip'
import RangeSlider from './components/RangeSlider/rangeSlider'
import { FiSearch } from 'react-icons/fi'

function App() {
    const [isChecked, setIsChecked] = useState(false)
    const [value, setValue] = useState(0)

    return (
        <div className="App">
            <Input
                placeholder="Enter your name"
                onChange={(e) => console.log(e.target.value)}
            />
            <Button onClick={() => console.log('clicked')} icon={<FiSearch />}>
                Search
            </Button>
            <Ratio
                isChecked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
            <Checkbox
                isChecked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                disabled
            />
            <Chip
                label="Label"
                isSelected={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
            <RangeSlider
                min={0}
                max={20}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                label="km"
            />
        </div>
    )
}

export default App
