import { createSlice } from '@reduxjs/toolkit'

const storageSlice = createSlice({
    name: 'appStorage',
    initialState: {
        currentUser: null,
        housesCache: null,
        jobsCache: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setHousesCache: (state, action) => {
            state.housesCache = action.payload
        },
        setJobsCache: (state, action) => {
            state.jobsCache = action.payload
        },
    },
})

export const { setCurrentUser, setHousesCache, setJobsCache } =
    storageSlice.actions

export default storageSlice.reducer
