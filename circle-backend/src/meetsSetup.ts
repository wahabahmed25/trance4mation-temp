import { SpacesServiceClient } from "@google-apps/meet";
import { JWT } from "google-auth-library";
import 'dotenv/config'

const credentials = new JWT({
    email: process.env.MEETS_SERVICE_ACCOUNT_CLIENT_EMAIL,
    key: process.env.MEETS_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/meetings.space.created"]
})
export const meets = new SpacesServiceClient({
    authClient: credentials
})


