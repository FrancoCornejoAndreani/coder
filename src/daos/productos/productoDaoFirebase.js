import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"; 

class ProductoDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("productos")
    }

    async update(id, title, description, code, price, thumbnail, stock){
      const doc = this.collection.doc(id)
      await doc.update({title, description, code, price, thumbnail, stock})
      console.log(`Se a modificado el producto con ID : ${this.collection.doc(id)}`)
      }

    async newProduct(title, description, code, price, thumbnail, stock){
      const doc = this.collection.doc()
      await doc.create({title, description, code, price, thumbnail, stock,timestamp:Date.now()}) 
      console.log(`Se agrego un nuevo producto : ${doc}`)  
      }

    async productById(id){
      const doc = this.collection.doc(id)
      console.log(doc)
      res.json(doc)
    }
}

export default ProductoDaoFirebase;