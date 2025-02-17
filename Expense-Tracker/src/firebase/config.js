import conf from '../conf/conf'
import { getFirestore } from "firebase/firestore";
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
     createPost() {
        try {
            // console.log('inside method : ',this?.databases);
                
            return this?.databases
            // await addDoc(
            //     collection(this.databases,"expense-data") , 
            //     {
            //         expense_category : "Food",
            //         expense_amount : 503
            //     }
            // )
        } catch (error) {
            console.log("Firebase Service :: createPost :: Error ", error);
        }
    }

    //update post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: Error :: updatePost ", error);
        }
    }

    //delete post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: Error ", error);
            return false;
        }
    }

    //list one post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: Error ", error);
            return false;
        }
    }

    //list all posts which are active
    async getPosts(queries = [Query.equal("Status", "Active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //for queries index is required on attributes 
                [queries]
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: Error ", error);
            return false;
        }
    }

}

const service = new ServiceDB()

export default service
