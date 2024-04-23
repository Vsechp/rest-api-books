import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { BookService } from './book.service';//shortened
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse} from '@nestjs/swagger';
import { Book } from './book.entity';
// added swagger and new endpoints to get book by author and title
@ApiTags('books')

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ description: 'The books have been successfully fetched.', type: Book })
  findAll() {
    return this.bookService.findAll();
  }

  @Get('author/:author')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get book by author' })
  @ApiOkResponse({ description: 'The book has been successfully fetched.', type: Book })
  findByAuthor(@Param('author') author: string) {
    return this.bookService.findByAuthor(author);
  }

  @Get('title/:title')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get book by title' })
  @ApiOkResponse({ description: 'The book has been successfully fetched.', type: Book })
  findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get book by id' })
  @ApiOkResponse({ description: 'The book has been successfully fetched.', type: Book })
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }
}
