import { doc, collection, onSnapshot } from 'firebase/firestore'
import { database } from '../utils/FirebaseConfig'

function realtimeDocument(collectionName, documentId, callback) {
    const collectionPath = collection(database, collectionName)
    const documentPath = doc(collectionPath, documentId)
    const cancelFunc = onSnapshot(documentPath, (document) =>
        callback({
            id: document.id,
            ...document.data(),
        })
    )
    return cancelFunc
}

export { realtimeDocument }
