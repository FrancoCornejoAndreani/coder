import {CarritoDao} from '../daos/index.js';
import { ProductoDao } from '../daos/index.js';


export const postCarrito = async (req, res)=>{
    const elemento = await CarritoDao.newCart()
    res.json(elemento)
}

export const postProdInCart = async (req, res) => {
    const id_cart=req.params.id_cart
    const id_prod= req.params.id_prod
    const cart = await CarritoDao.getById(id_cart)
    const elementoProd = await ProductoDao.getById(id_prod)

    console.log("cart: ", id_cart)
    console.log("elementoProd: ", id_prod)
    console.log("QUE BIENE EN CART", cart)
    console.log("aca el prod", elementoProd)
    if(cart && elementoProd){
        cart.products.push(elementoProd)
    }

    res.json(cart)
}

export const verCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    res.json(elemento)
}

export const deleteCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    await CarritoDao.deleteById(id)
    res.json(await CarritoDao.getAll())
}

export const listarCarritos =  async (req, res) => {
    const verCarritos = await CarritoDao.getAll()
    res.json(verCarritos)
}