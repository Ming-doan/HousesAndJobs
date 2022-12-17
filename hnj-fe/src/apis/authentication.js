import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../utils/FirebaseConfig'
import { queryDocuments } from './queryDocuments'
import { collectionPath } from '../utils/Constants'

async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

function getCurrentUser() {
    return auth.currentUser
}

async function fetchUserData(uid) {
    const userData = await queryDocuments(
        collectionPath.users,
        'uid',
        '==',
        uid,
        1
    )
    return userData[0]
}

async function logout() {
    await signOut(auth)
}

export { login, getCurrentUser, fetchUserData, logout }
