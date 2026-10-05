import { Migration } from '@mikro-orm/migrations';

export class Migration20261005025059 extends Migration {

  override name = 'Migration20261005025059';

  override up(): void | Promise<void> {
    this.addSql(`create table "user" ("uuid" uuid not null default gen_random_uuid(), "fname" varchar(255) not null, "lname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "username" varchar(255) not null, primary key ("uuid"));`);
  }

}
