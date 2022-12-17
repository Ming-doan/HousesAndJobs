import { collection, addDoc } from 'firebase/firestore'
import { database } from '../utils/FirebaseConfig'

async function writeDocument(collectionName, data) {
    const collectionPath = collection(database, collectionName)
    const docRef = await addDoc(collectionPath, data)
    return docRef.id
}

export { writeDocument }
