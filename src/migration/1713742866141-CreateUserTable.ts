import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1713742866141 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(200) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users
        `);
    }
}