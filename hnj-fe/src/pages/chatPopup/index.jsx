import style from './style.module.scss'
import { Fragment, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsOpenChat, setMessagesRoom, setMessages } from '../detail/reducer'
import { readDocument } from '../../apis/readDocuments'
import { writeDocument } from '../../apis/writeDocument'
import { updateDocument } from '../../apis/updateDocument'
import { realtimeDocument } from '../../apis/realtimeDocument'
import { messageModel } from '../../models/models'
import Text from '../../components/Utils/text'
import Spacer from '../../components/Utils/spacer'
import Expanded from '../../components/Utils/expanded'
import Button from '../../components/Buttons/button'
import Input from '../../components/Inputs/input'
import GestureDetector from '../../components/Utils/gestureDetector'
import { GrClose } from 'react-icons/gr'
import { RiSendPlaneFill } from 'react-icons/ri'
import { collectionPath } from '../../utils/Constants'
import { timeFormat } from '../../utils/utils'

function ChatPopUp() {
    const [input, setInput] = useState('')
    const user = useSelector((state) => state.storage.currentUser)
    const messagesRoom = useSelector((state) => state.detail.messagesRoom)
    const messages = useSelector((state) => state.detail.messages)
    const data = useSelector((state) => state.detail.data)
    const dispatch = useDispatch()
    const messageRef = useRef(null)

    function handleSetInput(message) {
        setInput(message)
    }

    function handleCloseChat() {
        dispatch(setIsOpenChat(false))
    }

    function getMessageUI(message) {
        return (
            <div
                className={
                    message.from === user.id
                        ? style.myMessage
                        : style.friendMessage
                }
            >
                {message.from === user.id ? (
                    <div className={style.time}>
                        <Text helper>{message.time}</Text>
                    </div>
                ) : null}
                <div className={style.message}>
                    <Text
                        color={message.from === user.id ? 'gray100' : 'gray900'}
                    >
                        {message.message}
                    </Text>
                </div>
                {message.from !== user.id ? (
                    <div className={style.time}>
                        <Text helper>{message.time}</Text>
                    </div>
                ) : null}
            </div>
        )
    }

    async function getMessages() {
        let messages = []
        for (let i = 0; i < messagesRoom.messages.length; i++) {
            const message = await readDocument(
                collectionPath.message,
                messagesRoom.messages[i]
            )
            let formatMessage = {
                ...message,
                time: timeFormat(message.time),
            }
            messages.push(formatMessage)
        }
        dispatch(setMessages(messages))
    }

    async function handleSendMessage() {
        const message = messageModel({
            from: user.id,
            message: input,
        })
        let messageRef = await writeDocument(collectionPath.message, message)
        setInput('')
        await handleUpdateMessages(messageRef)
    }

    async function handleUpdateMessages(messageRef) {
        await updateDocument(collectionPath.messages, messagesRoom.id, {
            messages: [...messagesRoom.messages, messageRef],
        })
    }

    async function updateMessage(messageRoom) {
        let messages = []
        for (let i = 0; i < messageRoom.messages.length; i++) {
            const message = await readDocument(
                collectionPath.message,
                messageRoom.messages[i]
            )
            let formatMessage = {
                ...message,
                time: timeFormat(message.time),
            }
            messages.push(formatMessage)
        }
        dispatch(setMessages(messages))
        dispatch(setMessagesRoom(messageRoom))
    }

    function scrollToBottom(event) {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
    }

    useEffect(() => {
        getMessages()

        const cancelListener = realtimeDocument(
            collectionPath.messages,
            messagesRoom.id,
            updateMessage
        )

        if (messageRef) {
            messageRef.current.addEventListener(
                'DOMNodeInserted',
                scrollToBottom
            )
        }

        return () => {
            cancelListener()
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style.user}>
                <div className={style.avatar}>
                    <img src={data.owner.avatar} alt="" />
                </div>
                <Spacer space={10} />
                <div className={style.info}>
                    <Text b>{data.owner.name}</Text>
                </div>
                <Expanded />
                <Button variant="flat" auto onClick={() => handleCloseChat()}>
                    <GrClose />
                </Button>
            </div>
            <div className={style.chatZone} ref={messageRef}>
                {messages
                    ? messages.map((message, index) => (
                          <Fragment key={index}>
                              <Spacer space={10} />
                              {getMessageUI(message)}
                          </Fragment>
                      ))
                    : null}
            </div>
            <div className={style.input}>
                <Input
                    prompt="Enter message"
                    value={input}
                    onChange={(e) => handleSetInput(e.target.value)}
                    suffix={
                        <GestureDetector onPress={() => handleSendMessage()}>
                            <RiSendPlaneFill />
                        </GestureDetector>
                    }
                />
            </div>
        </div>
    )
}

export default ChatPopUp
