import express, { Router } from 'express';
import productRoutes from './routes/products/index';

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log('Listening on port ', port);
});

app.get('/', (req, res) => {
    res.send('Hello worldd');
});

app.use('/products', productRoutes);
