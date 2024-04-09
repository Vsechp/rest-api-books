import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertBooksIntoBook1612544293849 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO book (title, author) VALUES
            ('To Kill a Mockingbird', 'Harper Lee'),
            ('1984', 'George Orwell'),
            ('The Great Gatsby', 'F. Scott Fitzgerald'),
            ('Pride and Prejudice', 'Jane Austen'),
            ('The Catcher in the Rye', 'J.D. Salinger'),
            ('The Hobbit', 'J.R.R. Tolkien'),
            ('Fahrenheit 451', 'Ray Bradbury'),
            ('Jane Eyre', 'Charlotte Bronte'),
            ('Animal Farm', 'George Orwell'),
            ('Wuthering Heights', 'Emily Bronte'),
            ('Lord of the Flies', 'William Golding'),
            ('Moby Dick', 'Herman Melville'),
            ('War and Peace', 'Leo Tolstoy'),
            ('The Odyssey', 'Homer'),
            ('Ulysses', 'James Joyce'),
            ('Madame Bovary', 'Gustave Flaubert'),
            ('The Divine Comedy', 'Dante Alighieri'),
            ('The Brothers Karamazov', 'Fyodor Dostoevsky'),
            ('Don Quixote', 'Miguel de Cervantes'),
            ('The Iliad', 'Homer');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE books;
        `);
    }
}
