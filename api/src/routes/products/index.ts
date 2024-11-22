import { Router } from 'express';
import {
    createProduct,
    createReview,
    deleteProduct,
    deleteReview,
    getPopularProducts,
    getProductByCategory,
    getProductById,
    getReviewsByProduct,
    listProducts,
    updateProduct,
    updateReview,
} from './productsController.js';

import {
    createProductSchema,
    createReviewSchema,
    updateProductSchema,
    updateReviewSchema,
} from '../../db/productsSchema.js';
import { validateData } from '../..//middlewares/validationMiddleware.js';
import {
    verifySeller,
    verifyToken,
    verifyUser,
} from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/popular', getPopularProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductByCategory);
router.post(
    '/',
    verifyToken,
    verifySeller,
    validateData(createProductSchema),
    createProduct
);

router.delete('/:id', verifyToken, verifySeller, deleteProduct);

router.put(
    '/:id',
    verifyToken,
    verifySeller,
    validateData(updateProductSchema),
    updateProduct
);

//reviews logix
router.get('/:id/reviews', getReviewsByProduct);
router.post(
    '/:id/reviews',
    verifyToken,
    verifyUser,
    validateData(createReviewSchema),
    createReview
);
router.put(
    '/:id/reviews/:reviewId',
    verifyToken,
    verifyUser,
    validateData(updateReviewSchema),
    updateReview
);
router.delete('/:id/reviews/:reviewId', verifyToken, verifyUser, deleteReview);

export default router;
