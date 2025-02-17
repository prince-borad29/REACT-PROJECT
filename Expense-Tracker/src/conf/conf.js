const conf = {
    firebaseApi: String(import.meta.env.VITE_API_KEY),
    firebaseAuthDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
    firebaseDbUrl: String(import.meta.env.VITE_DATABASE_URL),
    firebaseProjectId : String(import.meta.env.VITE_PROJECT_ID),
    firebaseMessagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
    firebaseAppId: String(import.meta.env.VITE_APP_ID),
}


export default conf