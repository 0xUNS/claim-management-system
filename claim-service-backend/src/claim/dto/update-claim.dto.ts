import { IsEnum, IsOptional } from 'class-validator';
import { Status } from '@prisma/client';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClaimDto } from './';

export class UpdateClaimDto extends PartialType(CreateClaimDto) {
  @ApiProperty({
    description: 'Claim Status',
    example: 'PENDING',
    required: false,
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
