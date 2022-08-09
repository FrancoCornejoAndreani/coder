import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(nombrecollection) {
      this.collection = db.collection(nombrecollection);
    }
  
    async getById(id) {
      const doc = await this.collection.doc(id).get();
  
      const data = doc.data();
  
      return { ...data, id };
    }
  
    async getAll() {
      const docSnapshot = await this.collection.get()
      const docs = docSnapshot.docs;
  
      const response = docs.map((doc) =>{
        const result = doc.data();
        result.id = doc.id;
        return result;
      });
      return response;
    }
  
    async deleteById(id){
      await this.collection.doc(id).delete();
  }
  
}
  
  export default ContenedorFirebase;
