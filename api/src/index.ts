import express, { json, urlencoded } from 'express';
import productRoutes from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import orderRoutes from './routes/orders/index.js';

import serverless from 'serverless-http';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

const port = 3000;

if (process.env.NODE_ENV === 'dev') {
    app.listen(port, () => {
        console.log('Listening on port ', port);
    });
}

app.get('/', (req, res) => {
    res.send('Hello worldd');
});

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

export const handler = serverless(app);
