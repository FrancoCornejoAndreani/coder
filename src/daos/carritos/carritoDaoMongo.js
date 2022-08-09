import ContenedorMongo from '../../contenedores/contenedorMongo.js';
import mongoose from 'mongoose';

class CarritoDaoMongo extends ContenedorMongo{
    constructor(){
        super('carritos', new mongoose.Schema({
            timestamp: {type: String, required: true},
            productos: {type: Array, required: true}
        }))
    }

    async newCart(){
        const doc = new this.collection({timestamp: Date.now(), products: []})
        await doc.save();

        console.log(this.collection);
        console.log("Nuevo carrito Creado!");
    }

}

export default CarritoDaoMongo;