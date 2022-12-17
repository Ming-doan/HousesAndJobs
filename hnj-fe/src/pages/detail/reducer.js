import { createSlice } from '@reduxjs/toolkit'

export const detailSlice = createSlice({
    name: 'detail',
    initialState: {
        data: null,
        isOpen: false,
        messagesRoom: null,
        messages: [],
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setMessagesRoom: (state, action) => {
            state.messagesRoom = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
    },
})

export const { setData, setIsOpen, setMessagesRoom, setMessages } =
    detailSlice.actions

export default detailSlice.reducer
