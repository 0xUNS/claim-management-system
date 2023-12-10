import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AuthDto } from '.';

export class CreateUserDto extends AuthDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '0612345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'User bio',
    example: 'I am a software engineer',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;
}
