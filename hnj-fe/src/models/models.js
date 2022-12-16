import { Timestamp } from 'firebase/firestore'

export function messageModel(data) {
    let messageData = {
        from: '',
        message: '',
        time: Timestamp.now(),
        ...data,
    }

    return {
        from: messageData.from,
        message: messageData.message,
        time: messageData.time,
    }
}
