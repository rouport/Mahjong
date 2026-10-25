import express, { type Request, type Response, type NextFunction } from 'express';
import * as argon2 from "argon2";
import { wrap } from '@mikro-orm/postgresql';

import { DI } from '../server.js';

const router = express.Router();

const hashOptions: argon2.HashOptions = {
  type: argon2.argon2id,
  memoryCost: 19456, // KiB = 19 MiB
  timeCost: 2,
  parallelism: 1,
};

router
    .route('/users/:uuid')
    .all((req: Request, res: Response, next: NextFunction) => {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await DI.users.findOneOrFail(req.params);
            res.json(user);
        } catch (e: any) {
            return res.status(400).json({ message: e.message });
        }
    })
    .patch(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await DI.users.findOneOrFail(req.params);
            wrap(user).assign(req.body);
            await DI.em.flush();

            res.json(user);
        } catch (e: any) {
            return res.status(400).json({ message: e.message });
        }
    })
    .delete((req: Request, res: Response, next: NextFunction) => {
        next(new Error('not implemented'));
    });

    router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.status(400);
            return res.json({ message: 'One of `username, email, or password` is missing' });
        }

        try {
            const hash = await argon2.hash(req.body.password, hashOptions);
            req.body.password = hash;
            const author = DI.users.create(req.body);
            await DI.em.flush();
            res.json(author);
        } catch (e: any) {
            return res.status(400).json({ message: e.message });
        }
    })

export const UserController = router;