import style from './style.module.scss'
import { Fragment, useState, useEffect } from 'react'
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

const MY_ID = 'Xn72Ae011uSblt9smTeO'
const MESSAGE_ID = 'ylt57QUfx1NDdLYpo5Gf'
let messageRefs

function ChatPopUp({ messagesId }) {
    messagesId = MESSAGE_ID
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    function handleSetInput(message) {
        setInput(message)
    }

    function timeFormat(time) {
        let t = new Date(1970, 0, 1)
        t.setSeconds(time.seconds)

        let day = t.getDay()
        if (day === 0) day = 'Sun'
        else if (day === 1) day = 'Mon'
        else if (day === 2) day = 'Tue'
        else if (day === 3) day = 'Wed'
        else if (day === 4) day = 'Thu'
        else if (day === 5) day = 'Fri'
        else if (day === 6) day = 'Sat'

        let hour = t.getHours()
        if (hour < 10) hour = '0' + hour

        let minute = t.getMinutes()
        if (minute < 10) minute = '0' + minute

        return `${day} ${hour}:${minute}`
    }

    function getMessageUI(message) {
        return (
            <div
                className={
                    message.from === MY_ID
                        ? style.myMessage
                        : style.friendMessage
                }
            >
                {message.from === MY_ID ? (
                    <div className={style.time}>
                        <Text helper>{timeFormat(message.time)}</Text>
                    </div>
                ) : null}
                <div className={style.message}>
                    <Text
                        color={message.from === MY_ID ? 'gray100' : 'gray900'}
                    >
                        {message.message}
                    </Text>
                </div>
                {message.from !== MY_ID ? (
                    <div className={style.time}>
                        <Text helper>{timeFormat(message.time)}</Text>
                    </div>
                ) : null}
            </div>
        )
    }

    async function getMessages() {
        const messageRoom = await readDocument(
            collectionPath.messages,
            messagesId
        )
        let messages = []
        for (let i = 0; i < messageRoom.messages.length; i++) {
            const message = await readDocument(
                collectionPath.message,
                messageRoom.messages[i]
            )
            messages.push(message)
            messageRefs = messageRoom.messages
        }
        setMessages(messages)
    }

    async function handleSendMessage() {
        const message = messageModel({
            from: MY_ID,
            message: input,
        })
        let messageRef = await writeDocument(collectionPath.message, message)
        messages.push(message)
        await handleUpdateMessages(messageRef)
        setInput('')
    }

    async function handleUpdateMessages(messageRef) {
        console.log(messageRefs, messageRef)
        await updateDocument(collectionPath.messages, messagesId, {
            messages: [...messageRefs, messageRef],
        })
        messageRefs.push(messageRef)
    }

    async function updateMessage(messageRoom) {
        let messages = []
        for (let i = 0; i < messageRoom.messages.length; i++) {
            const message = await readDocument(
                collectionPath.message,
                messageRoom.messages[i]
            )
            messages.push(message)
            messageRefs = messageRoom.messages
        }
        setMessages(messages)
    }

    useEffect(() => {
        getMessages()

        let cancelListener = realtimeDocument(
            collectionPath.messages,
            MESSAGE_ID,
            updateMessage
        )

        return () => {
            cancelListener()
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style.user}>
                <div className={style.avatar}>
                    <img
                        src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-1/307117668_1482032569283453_3395348360132581087_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=U1q4jdOrokQAX-CaNce&_nc_ht=scontent.fsgn2-1.fna&oh=00_AfCyRBFyuicF6mztMqsOlVq5SyrVfwOduImqXq69HWwS9A&oe=639FA078"
                        alt=""
                    />
                </div>
                <Spacer space={10} />
                <div className={style.info}>
                    <Text b>Đinh Trần Yến Zii</Text>
                </div>
                <Expanded />
                <Button variant="flat" auto>
                    <GrClose />
                </Button>
            </div>
            <div className={style.chatZone}>
                {messages.map((message, index) => (
                    <Fragment key={index}>
                        <Spacer space={10} />
                        {getMessageUI(message)}
                    </Fragment>
                ))}
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
