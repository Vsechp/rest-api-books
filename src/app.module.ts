import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./module/users/user.module";
import { BookModule } from "./module/books/book.module";
import { ConfigModule } from "@nestjs/config";
import { MetricsController } from './module/metrics/metrics.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/**/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
    }),
    UserModule,
    BookModule
  ],
  controllers: [MetricsController]
})
export class AppModule {}
