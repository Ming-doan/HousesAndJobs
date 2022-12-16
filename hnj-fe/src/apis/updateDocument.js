import { collection, doc, setDoc } from 'firebase/firestore'
import database from '../utils/FirebaseConfig'

async function updateDocument(collectionName, documentId, data) {
    const collectionPath = collection(database, collectionName)
    const documentPath = doc(collectionPath, documentId)
    await setDoc(documentPath, data, { merge: true })
}

export { updateDocument }
