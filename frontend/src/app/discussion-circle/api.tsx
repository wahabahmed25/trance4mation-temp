import { useAuth } from "@/context/AuthContext";
import { ClientRoomData } from "@/features/discussion-circle/types/ClientRoomData";
import { RoomData } from "@/features/discussion-circle/types/RoomData";
import { RoomsContextData } from "@/features/discussion-circle/types/RoomsContextData";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { query, collection, getDocs, getFirestore, arrayUnion, doc, updateDoc, arrayRemove, onSnapshot, Timestamp } from "firebase/firestore";
import { createContext, useEffect, useRef, useState } from "react";

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
    const visibleRooms = rooms.filter((room) => room.expiresAt === undefined || room.expiresAt.seconds > Timestamp.now().seconds)
    return visibleRooms
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

export function useRooms() {
    const [roomListings, setRoomListings] = useState<RoomData[]>([]);
    const [currentRoom, setCurrentRoom] = useState<RoomData | undefined>();
    const joinRequest = useRef<string>(undefined)
    const unsubscribe = useRef<() => void>(undefined);
    const auth = useRef<User>(undefined)
    const user = useAuth().user;

    useEffect(() => {
        getRooms().then(setRoomListings);
        const authState = getAuth(FIREBASE_APP);
        onAuthStateChanged(authState, (authData) => {
            if (authData) {
                // User is signed in. https://firebase.google.com/docs/reference/js/firebase.User
                auth.current = authData;
            } else {
                // User is signed out
                auth.current = undefined
            }
        });
    }, [])

    useEffect(() => {
        // if the room no longer exists but we haven't unsubscribed yet, unsubscribe
        // trying to account for rooms deleting themselves after some time
        if (!currentRoom && unsubscribe.current) {
            unsubscribe.current()
        }
    }, [currentRoom])

    return {
        listings: roomListings,
        current: currentRoom,
        fetch: async () => {
            getRooms().then(setRoomListings)
        },
        reload: async () => {
            setRoomListings([])
            getRooms().then(setRoomListings)
        },
        join: async (id: string) => {
            // if the room we're trying to join is the same as the one we're in, do nothing
            if (!user || currentRoom?.id === id) {
                return
            }
            
            // if there is an existing join request that has not been fulfilled, 
            // and that join request is for the same room being requested right now, do nothing
            // this is to fix an issue where if you double click a room, you would subscribe to it twice
            if (joinRequest.current === id) {
                return
            }
            
            // if we are in a room, but we want to switch, leave the room without
            // setting currentRoom to undefined. This way we avoid a flickering visual effect
            if (currentRoom && currentRoom.id !== id) {
                unsubscribe.current?.();
                await leaveRoom(currentRoom.id, user.name, user.uid)
            }

            joinRequest.current = id
            await joinRoom(id, user.name, user.uid);
            unsubscribe.current = subscribeToRoom(id, setCurrentRoom)
            joinRequest.current = undefined
        },
        leave: async () => {
            if (!currentRoom || !user) {
                return
            }
            setCurrentRoom(undefined);
            unsubscribe.current?.();
            await leaveRoom(currentRoom.id, user.name, user.uid)
        },
        create: async (settings: ClientRoomData) => {
            await createRoom(settings);
            setRoomListings([])
            getRooms().then(setRoomListings)
        },
        startGame: async () => {
            if (!auth.current || !currentRoom) { 
                return 
            }
            const idToken = await auth.current.getIdToken();
            await startGame(currentRoom.id, idToken);
        },
        skipTurn: async () => {
            if (!auth.current || !currentRoom) { 
                return 
            }
            console.log("skipping turn")
            const idToken = await auth.current.getIdToken();
            await skipTurn(currentRoom.id, idToken);
        },
        search: (query: string) => {
            const trimmedQuery = query.trim()
            // search is empty
            if (trimmedQuery === "") {
                getRooms().then(setRoomListings)
                return
            }

            setRoomListings([])
            getRooms().then((rooms) => {
                const results: RoomData[] = []
                // search for rooms that start with the query
                rooms.forEach((room) => {
                    if (room.name.startsWith(trimmedQuery)) {
                        results.push(room)
                    }
                })
                // search for rooms that contain the query in their description
                rooms.forEach((room) => {
                    if (room.description.includes(trimmedQuery)) {
                        results.push(room)
                    }
                })
                setRoomListings(results)
            })
        }
    }
}