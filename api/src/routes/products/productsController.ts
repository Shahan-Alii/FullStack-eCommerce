import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { productsTable, reviewsTable } from '../../db/productsSchema.js';
import { eq, sql } from 'drizzle-orm';
import { usersTable } from '../../db/usersSchema.js';

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
        }

        // Fetch the seller's userName
        const [seller] = await db
            .select({ userName: usersTable.name })
            .from(usersTable)
            .where(eq(usersTable.id, product.seller_id));

        // Combine product details with userName
        const response = {
            ...product,
            seller_name: seller?.userName || 'Anonymous', // Fallback in case user is not found
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getProductByCategory(req: Request, res: Response) {
    const category = String(req.params.category);

    try {
        const products = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.category, category));

        console.log(products);
        console.log(category);

        if (products.length == 0) {
            res.status(404).json({
                message: 'products not found with given category',
            });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getPopularProducts(req: Request, res: Response) {
    try {
        console.log('hello');
        const result = await db
            .select()
            .from(productsTable)
            .orderBy(productsTable.rating)
            .limit(20);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error || 'An error occurred');
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const data = { ...req.cleanBody, seller_id: req.userId };

        const [product] = await db
            .insert(productsTable)
            .values(data)
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

//Reviews Logic

export async function createReview(req: Request, res: Response) {
    const { rating, comment } = req.cleanBody;
    const userId = req.userId;
    const productId = Number(req.params.id);

    if (!userId || typeof userId !== 'number') {
        res.status(400).json({ message: 'Valid user ID is required' });
        return;
    }

    try {
        const reviewData = {
            product_id: productId,
            user_id: userId,
            rating,
            comment,
        };

        const [review] = await db
            .insert(reviewsTable)
            .values(reviewData)
            .returning();

        const [product] = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.id, productId));

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const currentRating = product.rating || 0;
        const totalReviews = product.total_reviews || 0;

        const newTotalReviews = totalReviews + 1;
        const newRating =
            (currentRating * totalReviews + rating) / newTotalReviews;

        await db
            .update(productsTable)
            .set({ rating: newRating, total_reviews: newTotalReviews })
            .where(eq(productsTable.id, productId));

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).send(error || 'An error occurred');
    }
}

export async function getReviewsByProduct(req: Request, res: Response) {
    const productId = Number(req.params.id);

    try {
        const reviewsWithUserDetails = await db
            .select({
                reviewId: reviewsTable.id,
                rating: reviewsTable.rating,
                comment: reviewsTable.comment,
                userId: usersTable.id,
                userName: usersTable.name,
                date: reviewsTable.created_at,
            })
            .from(reviewsTable)
            .leftJoin(
                usersTable,
                eq(reviewsTable.user_id, usersTable.id) // Join reviews with users by user_id
            )
            .where(eq(reviewsTable.product_id, productId));

        res.status(200).json(reviewsWithUserDetails);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateReview(req: Request, res: Response) {
    const reviewId = Number(req.params.reviewId);
    const updatedFields = req.cleanBody;

    try {
        const [updatedReview] = await db
            .update(reviewsTable)
            .set(updatedFields)
            .where(eq(reviewsTable.id, reviewId))
            .returning();

        if (updatedReview) {
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteReview(req: Request, res: Response) {
    const reviewId = Number(req.params.reviewId);

    try {
        const [deletedReview] = await db
            .delete(reviewsTable)
            .where(eq(reviewsTable.id, reviewId))
            .returning();

        if (deletedReview) {
            res.status(200).json({
                message: 'Review deleted successfully',
            });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
