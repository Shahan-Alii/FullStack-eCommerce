import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { productsTable } from '../../db/productsSchema.js';

export async function createOrder(req: Request, res: Response) {
    try {
        const { order, items } = req.cleanBody;

        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: 'Invalid order data' });
            return;
        }

        // Generate a unique order number
        const order_number = uuidv4().slice(0, 10);

        const [newOrder] = await db
            .insert(ordersTable)

            .values({ user_id: Number(userId), order_number: order_number })
            .returning();

        const orderItems = items.map((item: any) => ({
            ...item,
            order_id: newOrder.id,
        }));
        const newOrderItems = await db
            .insert(orderItemsTable)
            .values(orderItems)
            .returning();

        res.status(201).json({ ...newOrder, items: newOrderItems });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Invalid order data' });
    }
}

export async function listOrders(req: Request, res: Response) {
    try {
        let orders: any = [];

        if (req.role === 'admin') {
            orders = await db.select().from(ordersTable);
        } else {
            orders = await db
                .select()
                .from(ordersTable)
                .where(eq(ordersTable.user_id, Number(req.userId)));
        }

        res.json(orders);
    } catch (error) {
        console.error('Query Error:', error);
        res.status(500).send(error);
    }
}

export async function getOrder(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);

        const orderWithItems = await db
            .select()
            .from(ordersTable)
            .where(eq(ordersTable.id, id))
            .leftJoin(
                orderItemsTable,
                eq(ordersTable.id, orderItemsTable.order_id)
            )
            .leftJoin(
                productsTable,
                eq(orderItemsTable.product_id, productsTable.id)
            );

        console.log(orderWithItems);

        if (orderWithItems.length === 0) {
            res.status(404).send('Order not found');
            return;
        }

        const mergedOrder = {
            ...orderWithItems[0].orders,
            items: orderWithItems.map((orderItem) => ({
                ...orderItem.order_items,
                product: orderItem.products,
            })),
        };

        res.status(200).json(mergedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
}

export async function updateOrder(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);

        const [updatedOrder] = await db
            .update(ordersTable)
            .set(req.body)
            .where(eq(ordersTable.id, id))
            .returning();

        if (!updatedOrder) {
            res.status(404).send('Order not found');
        } else {
            res.status(200).json(updatedOrder);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
