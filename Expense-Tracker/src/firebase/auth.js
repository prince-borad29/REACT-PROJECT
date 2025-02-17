/* eslint-disable no-useless-catch */
import conf from '../conf/conf'
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
import {initializeApp} from 'firebase/app'

export class AuthService {
    auth;
    app;//

    constructor() {
        this.app = initializeApp({
            apiKey: conf.firebaseApi,
            authDomain: conf.firebaseAuthDomain,
            databaseURL: conf.firebaseDbUrl,
            projectId: conf.firebaseProjectId,
            messagingSenderId: conf.firebaseMessagingSenderId,
            appId: conf.firebaseAppId,
        });

        this.auth = getAuth(this.app)
    }

    //coding in a way that if i don't use appwrite then it doesn't affect more

    /**
    using async because untill registration is not completed we can't process furthure
    */
    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                //call another method for login user to app after successful registration
                return this.login({ email, password });
            }

            else {
                return userAccount;
            }
        }
        catch (error) {
            console.log("Appwrite service :: createAccount :: error ", error);
        }
    }

    async login({ email, password }) {

        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            console.log("Appwrite service :: login :: error ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }
}

const authService = new AuthService();

export default authService;