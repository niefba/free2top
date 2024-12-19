import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesInactive1734623201644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                ALTER TABLE "courses"
                ADD COLUMN "inactive" boolean NOT NULL DEFAULT FALSE;
            `, undefined);
        }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                ALTER TABLE "courses"
                DROP "inactive";
            `, undefined);
        }

}
