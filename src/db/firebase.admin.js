import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import Path from "path";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: cert(Path.join("src/simplified-blog-app-firebase-adminsdk-fbsvc-0577a28f1f.json"))
    });
}

export default admin;