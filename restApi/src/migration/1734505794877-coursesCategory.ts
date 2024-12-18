import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesCategory1734505794877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "courses"
            ADD COLUMN "category" character varying NOT NULL DEFAULT 'ski touring';
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "courses"
            DROP "category";
        `, undefined);
    }

}
