import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateClaimDto, UpdateClaimDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Status } from '@prisma/client';
import { Claim } from './entities';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ClaimService {
  constructor(private prisma: PrismaService) {}

  async getClaims(
    userId: string,
    page: number = 1,
    pageSize: number = 10,
    keyword?: string,
    status?: Status,
    archived?: boolean,
  ): Promise<Claim[]> {
    if (await this.hasBoAgentRole(userId)) userId = undefined;
    return await this.prisma.claim
      .findMany({
        where: {
          userId,
          status,
          archived,
          OR: [
            { title: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
          ],
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      })
      .then((claims) => {
        return claims.map((claim) => plainToClass(Claim, claim));
      })
      .catch(() => {
        throw new ForbiddenException('Access to resources denied');
      });
  }

  async getClaimById(userId: string, claimId: string) {
    if (await this.hasBoAgentRole(userId)) userId = undefined;
    return this.prisma.claim
      .findFirst({
        select: {
          id: true,
          title: true,
          description: true,
          productType: true,
          status: true,
          rating: true,
        },
        where: { id: claimId, userId },
      })
      .catch(() => {
        throw new ForbiddenException('Claim with ID ${claimId} not found');
      });
  }

  async createClaim(userId: string, dto: CreateClaimDto): Promise<Claim> {
    return this.prisma.claim.create({
      data: { userId, ...dto },
    });
  }

  async updateClaimById(
    userId: string,
    claimId: string,
    dto: UpdateClaimDto,
  ): Promise<Claim> {
    const claim = await this.prisma.claim.findUnique({
      where: { id: claimId },
    });

    if (!claim || claim.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.claim.update({
      where: { id: claimId },
      data: { ...dto },
    });
  }

  async cancelClaimById(userId: string, claimId: string): Promise<Claim> {
    const claim = await this.prisma.claim.findUnique({
      where: { id: claimId },
    });

    if (!claim || claim.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.claim.update({
      where: { id: claimId },
      data: { status: Status.CANCELLED, archived: true },
    });
  }

  async archiveClaimById(userId: string, claimId: string): Promise<Claim> {
    const claim = await this.prisma.claim.findUnique({
      where: { id: claimId },
    });

    if (!claim || claim.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.claim.update({
      where: { id: claimId },
      data: { archived: true },
    });
  }

  hasBoAgentRole = async (userId: string): Promise<boolean> => {
    return await this.prisma.user
      .findUnique({ select: { role: true }, where: { id: userId } })
      .then(({ role }) => role === Role.BO_AGENT);
  };
}
