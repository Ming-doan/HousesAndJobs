import { configureStore } from '@reduxjs/toolkit'
import storageReducer from './appStorage'
import detailReducer from '../pages/detail/reducer'
import homeFilterReducer from '../pages/filters/homeFilterReducer'
import jobFilterReducer from '../pages/filters/jobFilterReducer'

export default configureStore({
    reducer: {
        storage: storageReducer,
        detail: detailReducer,
        homeFilter: homeFilterReducer,
        jobFilter: jobFilterReducer,
    },
})
