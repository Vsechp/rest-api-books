import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./book.entity";
import { Counter } from "prom-client";

const findAllCounter = new Counter({
  name: "book_find_all_total",
  help: "Total number of BookService.findAll calls",
});

const findOneCounter = new Counter({
  name: "book_find_one_total",
  help: "Total number of BookService.findOne calls",
});

const findByAuthorCounter = new Counter({
  name: "book_find_by_author_total",
  help: "Total number of BookService.findByAuthor calls",
});

const findByTitleCounter = new Counter({
  name: "book_find_by_title_total",
  help: "Total number of BookService.findByTitle calls",
});

@Injectable()
export class BookService {
  public constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  public async findAll(limit: number, offset: number) {
    findAllCounter.inc(); // Increment the counter

    const data = await this.bookRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      data,
      limit,
      offset,
    };
  }

  public async findOne(id: number) {
    findOneCounter.inc(); // Increment the counter

    return this.bookRepository.findOne({ where: { id } });
  }

  public async findByAuthor(author: string) {
    findByAuthorCounter.inc(); // Increment the counter

    return this.bookRepository.find({ where: { author } });
  }

  public async findByTitle(title: string) {
    findByTitleCounter.inc(); // Increment the counter

    return this.bookRepository.findOne({ where: { title } });
  }
}
