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

  public async findOne(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  public async findByAuthor(author: string) { 
    return this.bookRepository.findOne({ where: { author } }); // added finding book by id, author and title
  }

  public async findByTitle(title: string) { 
    return this.bookRepository.findOne({ where: { title} });
  }
  
}
