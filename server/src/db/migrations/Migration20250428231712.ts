import { Migration } from '@mikro-orm/migrations';

export class Migration20250428231712 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "deposit" ("id" varchar(255) not null, "guest_name" varchar(255) not null, "guest_email" varchar(255) not null, "check_in_date" timestamptz not null, "check_out_date" timestamptz not null, "security_deposit" int not null, "payment_intend_id" varchar(255) not null, "payment_status" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "deposit_pkey" primary key ("id"));`);

    this.addSql(`create table "payment" ("id" varchar(255) not null, "deposit_id" varchar(255) not null, "payment_intent_id" varchar(255) not null, "payment_status" varchar(255) not null, "payment_method_id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "payment_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "deposit" cascade;`);

    this.addSql(`drop table if exists "payment" cascade;`);
  }

}
