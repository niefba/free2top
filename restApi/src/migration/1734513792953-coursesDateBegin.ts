import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesDateBegin1734513792953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "courses"
            ADD COLUMN "dateBegin" date NOT NULL DEFAULT 'now';
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "courses"
            DROP "dateBegin";
        `, undefined);
    }

}
