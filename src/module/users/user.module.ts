import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // what will happen if JWT_SECRET is bad | empty?
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {
  сonstructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined'); // added check for JWT_SECRET
    }
}
}