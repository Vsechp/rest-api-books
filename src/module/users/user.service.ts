import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    public async register(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        await this.userRepository.save(user);
        return user;
    }

    // not used anywhere
    public async login(user: any) {
        const payload = {username: user.username, sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Please get rid of `any` here
    public async validateUser(payload: any): Promise<any> {
        return await this.userRepository.findOne({where: {email: payload.email}});
    }
}
