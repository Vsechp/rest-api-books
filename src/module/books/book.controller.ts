import { Controller, Get, UseGuards } from '@nestjs/common';
import { BookService } from '../books/book.service'; // can be shortened
import { JwtAuthGuard } from '../../auth/jwt.strategy';

// please add swagger here
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.bookService.findAll();
  }
}
