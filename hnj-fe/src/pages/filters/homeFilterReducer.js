import { createSlice } from '@reduxjs/toolkit'

const homeFilterSlice = createSlice({
    name: 'homeFilter',
    initialState: {
        priceRange: 10,
        numberOfBed: 1,
        numberOfToilet: 1,
        cookingSection: false,
        balcony: false,
        washingMachine: false,
    },
    reducers: {
        setPriceRange: (state, action) => {
            state.priceRange = action.payload
        },
        setNumberOfBed: (state, action) => {
            state.numberOfBed = action.payload
        },
        setNumberOfToilet: (state, action) => {
            state.numberOfToilet = action.payload
        },
        setCookingSection: (state, action) => {
            state.cookingSection = action.payload
        },
        setBalcony: (state, action) => {
            state.balcony = action.payload
        },
        setWashingMachine: (state, action) => {
            state.washingMachine = action.payload
        },
    },
})

export const {
    setPriceRange,
    setNumberOfBed,
    setNumberOfToilet,
    setCookingSection,
    setBalcony,
    setWashingMachine,
} = homeFilterSlice.actions

export default homeFilterSlice.reducer
