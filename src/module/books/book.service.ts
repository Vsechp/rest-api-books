import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  public constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  public async findAll() {
    return this.bookRepository.find();
  }
}
