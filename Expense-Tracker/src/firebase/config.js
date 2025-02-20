import conf from '../conf/conf'
import { deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';

export class ServiceDB {
  

    constructor() {
        this.app = new initializeApp({
            apiKey: conf.firebaseApi,
            authDomain: conf.firebaseAuthDomain,
            databaseURL: conf.firebaseDbUrl,
            projectId: conf.firebaseProjectId,
            messagingSenderId: conf.firebaseMessagingSenderId,
            appId: conf.firebaseAppId,
        });
        this.databases = new getFirestore(this.app);
        // this.createPost = this.createPost.bind(this)
        // this.getDoc = this.getDoc.bind(this)
        // console.log('constructure : ',this.databases);
    }

    //create post
    async createDoc(category, amount) {
        try {
            // console.log('inside method : ',this?.databases);
            console.log(`cat :: ${category} || amt :: ${amount}`);
            
            return await addDoc(
                collection(this.databases,"expense-data") , 
                {   
                    expense_category : category,//{category} give object with key and value in js 
                    expense_amount : amount
                }
            )
        } catch (error) {
            console.log("Firebase Service :: createPost :: Error ", error);
        }
    }

    //update post
    async updatePost() {
        try {
            return await updateDoc(
                
            )
        } catch (error) {
            console.log("Firebase Service :: Error :: updatePost ", error);
        }
    }

    //delete post
    async deleteDoc(id) {
        try {
            await deleteDoc(
                doc(this.databases,"expense-data",id)
            );
            return true;
        } catch (error) {
            console.log("Firebase Service :: deletePost :: Error ", error);
            return false;
        }
    }

    //list one post
    async getDoc() {
        try {
            const res = await getDocs(collection(this.databases ,"expense-data" ))
            return res;
        } catch (error) {
            console.log("Firebase Service :: getDocs :: Error ", error);
            return false;
        }
    }

    //list all posts which are active
    // async getPosts(queries = [Query.equal("Status", "Active")]) {
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.FirebaseDatabaseId,
    //             conf.FirebaseCollectionId,
    //             //for queries index is required on attributes 
    //             [queries]
    //         )
    //     } catch (error) {
    //         console.log("Firebase Service :: getPosts :: Error ", error);
    //         return false;
    //     }
    // }

}

const service = new ServiceDB()

export default service
