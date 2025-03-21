import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import dotEnv from "dotenv";

dotEnv.config({ path: ".env" });

const firebaseApp = initializeApp({
    apiKey: process.env.FIREBASE_API,
    projectId: process.env.FIREBASE_PROJECT_ID,
});

const auth = getAuth(firebaseApp);

export {
    auth,
    firebaseApp,
}

