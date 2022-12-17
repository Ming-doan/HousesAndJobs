import { configureStore } from '@reduxjs/toolkit'
import storageReducer from './appStorage'
import detailReducer from '../pages/detail/reducer'

export default configureStore({
    reducer: {
        storage: storageReducer,
        detail: detailReducer,
    },
})
