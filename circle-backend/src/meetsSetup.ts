import { SpacesServiceClient } from "@google-apps/meet";
import { JWT } from "google-auth-library";
import { google } from "googleapis";
import 'dotenv/config'

// const auth = new google.auth.GoogleAuth({
//     credentials: {
//         client_email: process.env.MEETS_SERVICE_ACCOUNT_CLIENT_EMAIL,
//         private_key: process.env.MEETS_SERVICE_ACCOUNT_PRIVATE_KEY
//     },
//     scopes: ["https://www.googleapis.com/auth/meetings.space.created"]
// })

// const authClient = await auth.getClient()
// export const meets = google.meet({version: "v2", auth: auth})
// const res = await meets.spaces.create()

// const credentials = new JWT({
//     email: process.env.MEETS_SERVICE_ACCOUNT_CLIENT_EMAIL,
//     key: process.env.MEETS_SERVICE_ACCOUNT_PRIVATE_KEY,
//     scopes: ["https://www.googleapis.com/auth/meetings.space.created"]
// })
// export const meets = new SpacesServiceClient({
//     credentials: {
//         client_email: process.env.MEETS_SERVICE_ACCOUNT_CLIENT_EMAIL,
//         private_key: process.env.MEETS_SERVICE_ACCOUNT_PRIVATE_KEY
//     },
//     scopes: ["https://www.googleapis.com/auth/meetings.space.created"]
// })

// console.log(url)


