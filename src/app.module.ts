import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/users/user.module';
import { BookModule } from './module/books/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // maybe this leads to issues with migrations? google it please.
    }),
    UserModule,
    BookModule
  ]
})
export class AppModule {}
