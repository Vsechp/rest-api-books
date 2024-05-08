import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Counter } from 'prom-client';

interface Payload {
    email: string;
}

const registerCounter = new Counter({
  name: 'user_register_total',
  help: 'Total number of UserService.register calls',
});

const validateUserCounter = new Counter({
  name: 'user_validate_total',
  help: 'Total number of UserService.validateUser calls',
});

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  public async register(createUserDto: CreateUserDto) {
    registerCounter.inc();  // Increment the counter

    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 'any' type replaced with 'Payload' interface to improve code readability
  public async validateUser(payload: Payload): Promise<User | undefined> {
    validateUserCounter.inc();  // Increment the counter

    return await this.userRepository.findOne({
      where: { email: payload.email },
    });
  }
}
