import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesDateStamm1734623111907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                ALTER TABLE "courses"
                ADD COLUMN "dateStamm" date NOT NULL DEFAULT 'now';
            `, undefined);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                ALTER TABLE "courses"
                DROP "dateStamm";
            `, undefined);
        }

}
