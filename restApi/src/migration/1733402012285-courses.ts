import { MigrationInterface, QueryRunner } from "typeorm";

export class Courses1733402012285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            --Table Definition
            CREATE TABLE "courses"  (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "target" character varying NOT NULL,
                "itinerary" character varying NOT NULL,
                "description" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
              );
              
            -- Seeding
            INSERT INTO "courses" ("target", "itinerary", "description")
            VALUES ('Mont tendre', 'En traversée via Le Sentier', 'Course en nocturne un jour de semaine en janvier.');
              
              
              
              
        `),
        undefined;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courses"`, undefined);
    }

}
