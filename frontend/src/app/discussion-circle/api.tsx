import { ClientRoomData } from "@/features/discussion-circle/types/ClientRoomData";
import { RoomData } from "@/features/discussion-circle/types/RoomData";
import { initializeApp } from "firebase/app";
import { query, collection, getDocs, getFirestore, arrayUnion, doc, updateDoc, arrayRemove, onSnapshot, Timestamp } from "firebase/firestore";

const backendUrl = "http://localhost:5000"
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(FIREBASE_APP)
// export const AUTH = getAuth(FIREBASE_APP)

export async function getRooms() {
    const q = query(collection(FIRESTORE, "rooms"))
    const querySnapshot = await getDocs(q);
    const rooms = querySnapshot.docs.map((document) => {
        return {
            ...document.data(),
            "id": document.id
        } as RoomData
    })
    return rooms
}

export async function createRoom(settings: ClientRoomData) {
    const response = await fetch(`${backendUrl}/create-room`, {
        method: "POST",
        body: JSON.stringify(settings),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    return json
}

export async function joinRoom(roomId: string, name: string, uid: string) {
    await updateDoc(doc(collection(FIRESTORE, "rooms"), roomId), {
        participants: arrayUnion({
            name: name,
            uid: uid
        })
    })
}

export async function leaveRoom(roomId: string, name: string, uid: string) {
    await updateDoc(doc(collection(FIRESTORE, "rooms"), roomId), {
        participants: arrayRemove({
            name: name,
            uid: uid
        })
    })
}

export async function startGame(roomId: string, idToken: string) {
    const response = await fetch(`${backendUrl}/start-game`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomId: roomId
        })
    })
    const json = await response.json()
    return json
}


export async function skipTurn(roomId: string, idToken: string) {
    const response = await fetch(`${backendUrl}/skip-turn`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomId: roomId
        })
    })
    const json = await response.json()
    return json
}

export function subscribeToRoom(roomId: string, onChange: (data: RoomData) => void) {
    return onSnapshot(doc(FIRESTORE, "rooms", roomId), (snap) => {
        const newRoomData = {
            ...snap.data(),
            "id": roomId
        } as RoomData
        onChange(newRoomData)
    })
}

export async function addReaction(roomId: string, reactionIndex: number, timestamp: Timestamp = Timestamp.now()) {
    await updateDoc(doc(collection(FIRESTORE, "rooms"), roomId), {
        reaction: {
            reactionIndex: reactionIndex,
            timestamp: timestamp
        }
    })
}

// function joinRoom(roomId: string, user: User) {
//     await updateDoc(doc(collection(FIRESTORE, "rooms"), roomId), {
//         participants: arrayUnion({
//             name: user.displayName,
//             uid: user.uid
//         })
//     })
// }


// export async function leaveRoom(roomId: string, user: User) {
//     await updateDoc(doc(collection(FIRESTORE, "rooms"), roomId), {
//         participants: arrayRemove({
//             name: user.displayName,
//             uid: user.uid
//         })
//     })
// }

// export async function startRound(roomId: string, user: User) {
//     const token = await user.getIdToken(true)
//     const response = await fetch(`${backendUrl}/start-round`, {
//         method: "POST",
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             roomId: roomId
//         })
//     })
//     const json = await response.json()
//     return json
// }



