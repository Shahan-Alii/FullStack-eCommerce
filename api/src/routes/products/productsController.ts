import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { productsTable } from '../../db/productsSchema.js';
import { eq } from 'drizzle-orm';

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
        const [product] = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.id, id));

        console.log(product);

        if (!product) {
            res.status(404).json({
                message: 'product not found with given id',
            });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const [product] = await db
            .insert(productsTable)
            .values(req.cleanBody)
            .returning();

        res.status(201).json(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    try {
        const [updatedProduct] = await db
            .update(productsTable)
            .set(updatedFields)
            .where(eq(productsTable.id, id))
            .returning();

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'product not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
        const [deletedProduct] = await db
            .delete(productsTable)
            .where(eq(productsTable.id, id))
            .returning();

        if (deletedProduct) {
            res.status(200).json({
                message: 'product deleted successfully',
            });
        } else {
            res.status(404).json({ message: 'product not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
