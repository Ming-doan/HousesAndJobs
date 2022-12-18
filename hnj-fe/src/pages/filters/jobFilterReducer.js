import { createSlice } from '@reduxjs/toolkit'

const jobFilterSlice = createSlice({
    name: 'jobFilter',
    initialState: {
        salaryRange: 10,
        isPartTime: false,
    },
    reducers: {
        setSalaryRange: (state, action) => {
            state.salaryRange = action.payload
        },
        setIsPartTime: (state, action) => {
            state.isPartTime = action.payload
        },
    },
})

export const { setSalaryRange, setIsPartTime } = jobFilterSlice.actions

export default jobFilterSlice.reducer
