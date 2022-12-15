import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
import database from '../utils/FirebaseConfig'

async function readDocuments(collectionName) {
    const collectionPath = collection(database, collectionName)
    const snapshot = await getDocs(collectionPath)

    let data = snapshot.docs.map((doc) => {
        let returnedDoc = doc.data()
        returnedDoc['id'] = doc.id
        return returnedDoc
    })

    return data
}

async function readDocument(collectionName, documentId) {
    const collectionPath = collection(database, collectionName)
    const documentPath = doc(collectionPath, documentId)
    const snapshot = await getDoc(documentPath)

    if (snapshot.exists()) {
        let data = snapshot.data()
        data['id'] = snapshot.id
        return data
    } else {
        return null
    }
}

export { readDocuments, readDocument }
