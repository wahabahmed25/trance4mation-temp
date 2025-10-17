import type { Request, Response } from "express";
import e from "express";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore";
import 'dotenv/config'

const app = e()
const port = 5000

const firebase = initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
    }),
});
const firestore = getFirestore(firebase)

app.get("/", (req: Request, res: Response) => {
    firestore.collection("rooms").listDocuments()
        .then((data) => {
            res.send(data)
        })
})

app.post('/create-room', (req: Request, res: Response) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})