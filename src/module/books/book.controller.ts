import { Controller, Get, UseGuards } from '@nestjs/common';
import { BookService } from '../books/book.service'; 
import { JwtAuthGuard } from '../../auth/jwt.strategy';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.bookService.findAll();
  }
}