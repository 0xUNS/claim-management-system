import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@t-mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'pw1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
