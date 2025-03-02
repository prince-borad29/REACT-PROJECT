import conf from '../conf/conf'
import { deleteDoc, doc, getDocs, getFirestore, query, updateDoc , where } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { addDoc, collection , Timestamp } from 'firebase/firestore';

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
    async createDoc(category, amount , date , type , uid) {
        // console.log(`cat : ${category} || Amt : ${amount} || Date : ${date} || Type : ${type}`);
        
        try {
            
            return await addDoc(
                collection(this.databases,"expense-data") , 
                {   
                    expense_category : category,//{category} give object with key and value in js 
                    expense_amount : parseInt(amount),
                    expense_date : Timestamp.fromDate(new Date(date)),
                    expense_type : type,
                    user_id : uid
                }
            )
        } catch (error) {
            console.log("Firebase Service :: createPost :: Error ", error);
        }
    }

    //update post
    async updateDoc(id,category,amount,date,type) {
        try {
            // console.log(`ID => ${id} || Category => ${category} || Amount => ${amount} || Date => ${date} || Type => ${type}`);
            // console.log(new Date(date));
            
            return await updateDoc(
                doc(this.databases,"expense-data",id),
                {
                    expense_category : category,//{category} give object with key and value in js 
                    expense_amount : parseInt(amount),
                    expense_date : Timestamp.fromDate(new Date(date)),
                    expense_type : type,
                }
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
    async getDoc(id) {        
        try {
            const q = query(collection(this.databases,"expense-data"),where("user_id","==",id))
            const res = await getDocs(q)
            
            return res.docs;
        } catch (error) {
            console.log("Firebase Service :: getDocs :: Error ", error);
            return false;
        }
    }

}

const service = new ServiceDB()

export default service
