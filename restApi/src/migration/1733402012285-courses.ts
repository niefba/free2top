import { MigrationInterface, QueryRunner } from "typeorm";

export class Courses1733402012285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            --Table Definition
            CREATE TABLE "courses"  (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid REFERENCES users (id),
                "target" character varying NOT NULL,
                "itinerary" character varying NOT NULL,
                "description" character varying NOT NULL,
                "category" character varying NOT NULL DEFAULT 'ski touring',
                "dateBegin" date NOT NULL DEFAULT 'now',
                "dateStamm" date NOT NULL DEFAULT 'now',
                "altitude" integer NOT NULL DEFAULT 0,
                "ascending" integer NOT NULL DEFAULT 0,
                "hours" integer NOT NULL DEFAULT 0,
                "publicTransport" boolean NOT NULL DEFAULT FALSE,
                "inactive" boolean NOT NULL DEFAULT FALSE,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
              ); 
              
        `),
        undefined;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courses"`, undefined);
    }

}
