import { Request, Response } from 'express';

export function listProducts(req: Request, res: Response) {
    res.send('List of all products');
}

export function getProductById(req: Request, res: Response) {
    res.send('getProductById');
}

export function createProduct(req: Request, res: Response) {
    res.send('getProductById');
}

export function updateProduct(req: Request, res: Response) {
    res.send('getProductById');
}

export function deleteProduct(req: Request, res: Response) {
    res.send('getProductById');
}
