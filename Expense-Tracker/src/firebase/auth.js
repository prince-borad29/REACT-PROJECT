/* eslint-disable no-useless-catch */
import conf from '../conf/conf'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

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
    async createAccount(email, password) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await createUserWithEmailAndPassword(this.auth, email, password)

            if (userAccount) {
                //call another method for login user to app after successful registration
                // console.log(userAccount.user);

                // return this.login({ email, password });
                return userAccount.user;
            }

            else {
                return userAccount;
            }
        }
        catch (error) {
            console.log("Appwrite service :: createAccount :: error ", error);
        }
    }

    async login(email, password) {
        // console.log(email , password);

        try {
            const userInfo = await signInWithEmailAndPassword(this.auth, email, password);
            return userInfo.user
        }
        catch (error) {
            console.log("Appwrite service :: login :: error ", error);
        }
    }

    async getCurrentUser() {
        return new Promise((resolve, reject) => {
            try {
                onAuthStateChanged(this.auth, (user) => {
                    // console.log('userAuth Outside :: ',user);

                    if (user) {
                        // console.log('userInside IF : ' + user.uid);
                        resolve({id : user.uid,email : user.email})
                    }
                    else {
                        resolve(0)
                    }
                })
            } catch (error) {
                console.log('ERROR :: GET CUR USER :: AUTH :: ', error);
                reject(error)
            }
        }
        )

    }

    async logout() {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }
}

const authService = new AuthService();

export default authService;