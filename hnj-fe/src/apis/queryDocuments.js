import { query, collection, getDocs, where, limit } from 'firebase/firestore'
import { database } from '../utils/FirebaseConfig'

async function queryDocuments(
    collectionName,
    key,
    operation,
    value,
    limitValue
) {
    const collectionPath = collection(database, collectionName)
    const queryData = query(
        collectionPath,
        where(key, operation, value),
        limitValue ? limit(limitValue) : null
    )
    const querySnapshot = await getDocs(queryData)
    const documents = []
    querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() })
    })
    return documents
}

export { queryDocuments }
