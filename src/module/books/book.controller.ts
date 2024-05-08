import { Controller, Get, UseGuards, Param, NotFoundException, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';
import { ApiQuery } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit the number of results.' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset the start of results.' })

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ description: 'The books have been successfully fetched.', type: [BookDto] })
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.bookService.findAll(limit, offset);
  }

  @Get('author/:author')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get books by author' })
  @ApiOkResponse({ description: 'The books have been successfully fetched.', type: [BookDto] })
  async findByAuthor(@Param('author') author: string) {
    const books = await this.bookService.findByAuthor(author);
    if (!books.length) {
      throw new NotFoundException('Books not found');
    }
    return books;
  }

  @Get('title/:title')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get book by title' })
  @ApiOkResponse({ description: 'The book has been successfully fetched.', type: BookDto })
  async findByTitle(@Param('title') title: string) {
    const book = await this.bookService.findByTitle(title);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get book by id' })
  @ApiOkResponse({ description: 'The book has been successfully fetched.', type: BookDto })
  async findOne(@Param('id') id: number) {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}