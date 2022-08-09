import { Router } from 'express';
const router = Router();
import { getProductos, postProductos, getProductoId, putProduct,deleteProduct} from '../controllers/productoController.js';

import { postCarrito, deleteCarrito, listarCarritos, verCarrito, postProdInCart} from '../controllers/carritoController.js';

//Rutas Productos
router.get('/productos', getProductos)
router.get('/productos/:id', getProductoId)
router.post('/productos', postProductos)
router.put('/productos/:id', putProduct)
router.delete('/productos/:id', deleteProduct)

//Rutas Carrito
router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito)
router.get('/carrito', listarCarritos)
router.get('/carrito/:id/productos', verCarrito)

router.post('/carrito/:id_cart/productos/:id_prod', postProdInCart)


export default router