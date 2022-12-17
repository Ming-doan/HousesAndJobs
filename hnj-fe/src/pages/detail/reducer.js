import { createSlice } from '@reduxjs/toolkit'

export const detailSlice = createSlice({
    name: 'detail',
    initialState: {
        data: null,
        isOpenChat: false,
        messagesRoom: null,
        messages: [],
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        setIsOpenChat: (state, action) => {
            state.isOpenChat = action.payload
        },
        setMessagesRoom: (state, action) => {
            state.messagesRoom = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
    },
})

export const { setData, setIsOpenChat, setMessagesRoom, setMessages } =
    detailSlice.actions

export default detailSlice.reducer
