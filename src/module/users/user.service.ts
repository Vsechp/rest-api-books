import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

interface Payload {
    email: string;
    }

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  public async register(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 'any' type replaced with 'Payload' interface to improve code readability
  public async validateUser(payload: Payload): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: payload.email },
    });
  }
}
