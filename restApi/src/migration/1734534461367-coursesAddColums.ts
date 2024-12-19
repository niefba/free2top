import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesAddColums1734534461367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "courses"
            ADD COLUMN "altitude" integer NOT NULL DEFAULT 0;

            ALTER TABLE "courses"
            ADD COLUMN "ascending" integer NOT NULL DEFAULT 0;

            ALTER TABLE "courses"
            ADD COLUMN "hours" integer NOT NULL DEFAULT 0;

            ALTER TABLE "courses"
            ADD COLUMN "publicTransport" boolean NOT NULL DEFAULT FALSE;
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "courses"
            DROP "altitude";

            ALTER TABLE "courses"
            DROP "ascending";

            ALTER TABLE "courses"
            DROP "hours";

            ALTER TABLE "courses"
            DROP "publicTransport";
        `, undefined);
    }

}
