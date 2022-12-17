import {
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { auth } from '../utils/FirebaseConfig'
import { queryDocuments } from './queryDocuments'
import { writeDocument } from './writeDocument'
import { collectionPath } from '../utils/Constants'
import { getDisplayName } from '../utils/utils'

const provider = new GoogleAuthProvider()

async function checkUserExist(uid) {
    const userData = await queryDocuments(
        collectionPath.users,
        'uid',
        '==',
        uid,
        1
    )
    if (userData.length > 0) {
        return userData[0]
    } else {
        return null
    }
}

async function createNewUser() {
    const user = getCurrentUser()
    const userData = {
        uid: user.uid,
        name: user.displayName || getDisplayName(user.email),
        email: user.email,
        avatar: user.photoURL,
        messages: [],
    }
    const userId = await writeDocument(collectionPath.users, userData)
    return {
        ...userData,
        id: userId,
    }
}

async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log(auth.currentUser)
    } catch (error) {
        console.log(error)
    }
}

async function loginWithGoogle() {
    try {
        await signInWithPopup(auth, provider)
        const user = getCurrentUser()
        let userData = await checkUserExist(user.uid)
        console.log(userData)
        if (userData) {
            return userData
        } else {
            userData = await createNewUser()
            console.log(userData)
            return userData
        }
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

export { login, getCurrentUser, fetchUserData, logout, loginWithGoogle }
