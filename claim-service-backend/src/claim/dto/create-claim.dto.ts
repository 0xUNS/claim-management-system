import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClaimDto {
  @ApiProperty({ description: 'Title', example: 'Claim Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description',
    example: 'Claim Description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product Type',
    example: 'Bank credit',
    required: false,
  })
  @IsString()
  @IsOptional()
  productType?: string;
}
