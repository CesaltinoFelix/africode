import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CreateEstablishmentDto,
  UpdateEstablishmentDto,
} from '../dto/create-establishment.dto';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class EstablishmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    return this.prisma.establishment.create({
      data: createEstablishmentDto,
    });
  }

  async findAll(): Promise<Establishment[]> {
    return this.prisma.establishment.findMany();
  }

  async findOne(id: string): Promise<Establishment | null> {
    return this.prisma.establishment.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Establishment[]> {
    return this.prisma.establishment.findMany({
      where: { userId },
    });
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    return this.prisma.establishment.update({
      where: { id },
      data: updateEstablishmentDto,
    });
  }

  async delete(id: string): Promise<Establishment> {
    return this.prisma.establishment.delete({
      where: { id },
    });
  }
}
