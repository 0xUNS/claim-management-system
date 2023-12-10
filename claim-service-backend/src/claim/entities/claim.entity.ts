import { ApiProperty } from '@nestjs/swagger';

export class Claim {
  @ApiProperty({ description: 'Claim ID', example: '60a5e8d8e8c4a7001f4e3a9d' })
  id: string;

  @ApiProperty({ description: 'Title', example: 'Claim Title' })
  title: string;

  @ApiProperty({ description: 'Description', example: 'Claim Description' })
  description: string;

  @ApiProperty({ description: 'Product Type', example: 'Mobile Phone' })
  productType: string;

  @ApiProperty({ description: 'Claim Status', example: 'PENDING' })
  status: string;

  @ApiProperty({ description: 'Rating', example: 5 })
  rating: number;
}
