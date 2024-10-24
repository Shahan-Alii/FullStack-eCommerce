import { Router, Request, Response } from 'express';
import { validateData } from '../../middlewares/validationMiddleware.js';
import {
    createUserSchema,
    loginSchema,
    usersTable,
} from '../../db/usersSchema.js';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
    '/register',
    validateData(createUserSchema),
    async (req: Request, res: Response) => {
        try {
            const data = req.cleanBody;

            data.password = await bcrypt.hash(data.password, 10);

            const [user] = await db.insert(usersTable).values(data).returning();

            console.log(user);

            //@ts-ignore
            delete user.password;

            res.status(201).json({ user });
        } catch (error) {
            res.status(500).send('Something went wrong');
        }
    }
);

router.post(
    '/login',
    validateData(loginSchema),
    async (req: Request, res: Response) => {
        try {
            const { email, password } = req.cleanBody;

            const [user] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email));

            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const isMatched = await bcrypt.compare(password, user.password);

            if (!isMatched) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            //jwt

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                `${process.env.SECRET_KEY}`,
                { expiresIn: '20d' }
            );

            res.status(200).json({ token, user });
        } catch (error) {
            res.status(500).send('Something went wrong');
        }
    }
);

export default router;
