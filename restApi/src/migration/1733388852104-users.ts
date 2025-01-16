import { MigrationInterface, QueryRunner } from "typeorm";
import { encrypt } from "../helpers/encrypt";

export class Users1733388852104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const encryptedPassword = await encrypt.encryptpass('secret');
        await queryRunner.query(
            ` 
                --Table Definition
                CREATE TABLE "users"  (
                  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                  "firstName" character varying NOT NULL DEFAULT '',
                  "lastName" character varying NOT NULL DEFAULT '',
                  "email" character varying NOT NULL UNIQUE,
                  "password" character varying NOT NULL,
                  "role"  character varying NOT NULL DEFAULT 'user',
                  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                  CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                );

                -- Admin user
                INSERT INTO "users" ("email", "password", "role")
                VALUES ('free2top@ik.me', '${encryptedPassword}', 'admin');
                `
          ),
            undefined;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
