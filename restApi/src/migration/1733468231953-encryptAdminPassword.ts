import { MigrationInterface, QueryRunner } from "typeorm";
import { encrypt } from "../helpers/encrypt";

export class EncryptAdminPassword1733468231953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const encryptedPassword = await encrypt.encryptpass('secret');
        await queryRunner.query(`
            UPDATE users
            SET password = '${encryptedPassword}'
            WHERE name = 'admin' AND role = 'admin';
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE users
            SET password = 'secret'
            WHERE name = 'admin' AND role = 'admin';
        `, undefined);
    }

}
