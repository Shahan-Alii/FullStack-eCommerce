import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from './productsController';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
