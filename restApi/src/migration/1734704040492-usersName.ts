import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersName1734704040492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP "name";

            ALTER TABLE "users"
            ADD COLUMN "firstName" character varying NOT NULL DEFAULT '';

            ALTER TABLE "users"
            ADD COLUMN "lastName" character varying NOT NULL DEFAULT '';
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "name" character varying NOT NULL DEFAULT '';

            ALTER TABLE "users"
            DROP "firstName";

            ALTER TABLE "users"
            DROP "lastName";
        `, undefined);
    }

}
