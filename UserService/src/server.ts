import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/postgresql';

import { UserController } from './controllers/user.controller.js';
import { AuthenticationController } from './controllers/authentication.controller.js'
import { User } from './entities/User.js';
import config from './mikro-orm.config.js';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  users: EntityRepository<User>,
};

export const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  DI.orm = await MikroORM.init(config);
  DI.em = DI.orm.em;
  DI.users = DI.orm.em.getRepository(User);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to my Mahjong Game!' }));
  app.use('/', UserController);
  app.use('/', AuthenticationController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();