import { defineConfig } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { User } from './entities/index.js';

export default defineConfig({
  entities: [User],
  dbName: 'mahjong',
  metadataProvider: ReflectMetadataProvider,
  dynamicImportProvider: id => import(id),
  debug: true,
});