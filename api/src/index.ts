import express, { json, urlencoded } from 'express';
import productRoutes from './routes/products/index';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

const port = 3000;

app.listen(port, () => {
    console.log('Listening on port ', port);
});

app.get('/', (req, res) => {
    res.send('Hello worldd');
});

app.use('/products', productRoutes);
