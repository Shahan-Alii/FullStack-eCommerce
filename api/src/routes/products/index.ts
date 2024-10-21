import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('List of all products');
});

router.get('/:id', (req, res) => {
    res.send('products with given id');
});

router.post('/', (req, res) => {
    res.send('adding a new product');
});

export default router;
