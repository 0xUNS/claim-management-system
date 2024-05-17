import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  ParseBoolPipe,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CreateClaimDto, UpdateClaimDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser, Roles } from './../auth/decorator';
import { RolesGuard } from './../auth/guard';
import { Role, Status } from '@prisma/client';
import { Claim as ClaimEntity } from './entities';

@ApiTags('Claims')
@ApiBearerAuth()
@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: Status,
  })
  @ApiQuery({ name: 'archived', required: false })
  @Get()
  async getClaims(
    @GetUser('sub') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') keyword: string = '',
    @Query('status') status?: Status,
    @Query('archived', new DefaultValuePipe(false), ParseBoolPipe)
    archived?: boolean,
  ): Promise<ClaimEntity[] | []> {
    return this.claimService.getClaims(
      userId,
      page,
      limit,
      keyword,
      status,
      archived,
    );
  }

  @Get(':id')
  async getClaimById(
    @GetUser('sub') userId: string,
    @Param('id') claimId: string,
  ) {
    return this.claimService.getClaimById(userId, claimId);
  }

  @Roles(Role.CUSTOMER)
  @UseGuards(RolesGuard)
  @Post()
  async createClaim(
    @GetUser('sub') userId: string,
    @Body() dto: CreateClaimDto,
  ): Promise<ClaimEntity> {
    return this.claimService.createClaim(userId, dto);
  }

  @Patch(':id')
  async updateClaim(
    @GetUser('sub') userId: string,
    @Param('id') claimId: string,
    @Body() dto: UpdateClaimDto,
  ): Promise<ClaimEntity> {
    return this.claimService.updateClaimById(userId, claimId, dto);
  }

  @Roles(Role.CUSTOMER)
  @UseGuards(RolesGuard)
  @Patch(':id/cancel')
  async cancelClaim(
    @GetUser('sub') userId: string,
    @Param('id') claimId: string,
  ): Promise<ClaimEntity> {
    return this.claimService.cancelClaimById(userId, claimId);
  }

  @Patch(':id/archive')
  async archiveClaim(
    @GetUser('sub') userId: string,
    @Param('id') claimId: string,
  ): Promise<ClaimEntity> {
    return this.claimService.archiveClaimById(userId, claimId);
  }
}
