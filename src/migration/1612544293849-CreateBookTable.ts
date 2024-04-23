import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBookTable1612544293849 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE book (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                author VARCHAR(100) NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE book
        `);
    }
}