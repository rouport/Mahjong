import express, { type Request, type Response, type Express } from 'express';
import * as argon2 from "argon2";

import { DI } from '../server.js';
import { TokenService } from '../services/TokenService/token.service.js'

const app: Express = express();

// GET method route
app.post('/auth', async(req: Request, res: Response) => {
    try {
            const user = await DI.users.findOneOrFail({email: req.body.email});
            if (await argon2.verify(user.password, req.body.password)) {
                // password match
                const token = TokenService.generateAccessToken(user)

                return res.send(token);
            } else {
                // password did not match
                return res.status(401).json({ message: "nope" });
            }
        } catch (e: any) {
            return res.status(400).json({ message: e.message });
        }
});

export const AuthenticationController = app;