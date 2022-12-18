import { createSlice } from '@reduxjs/toolkit'

const storageSlice = createSlice({
    name: 'appStorage',
    initialState: {
        currentUser: null,
        housesCache: null,
        jobsCache: null,
        searchedHouses: null,
        searchedJobs: null,
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
        setSearchedHouses: (state, action) => {
            state.searchedHouses = action.payload
        },
        setSearchedJobs: (state, action) => {
            state.searchedJobs = action.payload
        },
    },
})

export const {
    setCurrentUser,
    setHousesCache,
    setJobsCache,
    setSearchedHouses,
    setSearchedJobs,
} = storageSlice.actions

export default storageSlice.reducer
