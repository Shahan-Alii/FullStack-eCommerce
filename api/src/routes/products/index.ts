import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from './productsController';

import {
    createProductSchema,
    updateProductSchema,
} from '../../db/productsSchema';
import { validateData } from '../..//middlewares/validationMiddleware';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', validateData(createProductSchema), createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', validateData(updateProductSchema), updateProduct);

export default router;
