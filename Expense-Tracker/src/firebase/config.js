import conf from '../conf/conf'
import { getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';

export class ServiceDB {
    app;
    databases;

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
        this.createPost = this.createPost.bind(this)
        // console.log('constructure : ',this.databases);
    }

    //create post
    async createPost() {
        try {
            // console.log('inside method : ',this?.databases);
            return await addDoc(
                collection(this.databases,"expense-data") , 
                {
                    expense_category : "Food",
                    expense_amount : 503
                }
            )
        } catch (error) {
            console.log("Firebase Service :: createPost :: Error ", error);
        }
    }

    //update post
    async updatePost() {
        try {
            return await updateDocument(
                
            )
        } catch (error) {
            console.log("Firebase Service :: Error :: updatePost ", error);
        }
    }

    //delete post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
            
            );
            return true;
        } catch (error) {
            console.log("Firebase Service :: deletePost :: Error ", error);
            return false;
        }
    }

    //list one post
    async getPost(slug) {
        try {
            return await getDoc(
                collection ,
                
            )
        } catch (error) {
            console.log("Firebase Service :: getPost :: Error ", error);
            return false;
        }
    }

    //list all posts which are active
    async getPosts(queries = [Query.equal("Status", "Active")]) {
        try {
            return await this.databases.listDocuments(
                conf.FirebaseDatabaseId,
                conf.FirebaseCollectionId,
                //for queries index is required on attributes 
                [queries]
            )
        } catch (error) {
            console.log("Firebase Service :: getPosts :: Error ", error);
            return false;
        }
    }

}

const service = new ServiceDB()

export default service
