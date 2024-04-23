// Added a validation for email and password
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty , Length} from 'class-validator';
export class CreateUserDto {
    @ApiProperty({
        example: 'test@mail.com',
        required: true,

     })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '1234578910',
        required: true
     })
     @IsNotEmpty()
     @Length(8, 20)
    password: string;
}
