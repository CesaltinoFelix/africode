import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateQueueDto, UpdateQueueDto } from '../dto/create-queue.dto';
import { Queue } from '../entities/queue.entity';

@Injectable()
export class QueueRepository {
  constructor(private prisma: PrismaService) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    return this.prisma.queue.create({
      data: createQueueDto,
    });
  }

  async findAll(): Promise<Queue[]> {
    return this.prisma.queue.findMany({
      include: { tickets: true },
    });
  }

  async findOne(id: string): Promise<Queue | null> {
    return this.prisma.queue.findUnique({
      where: { id },
      include: { tickets: true },
    });
  }

  async findByEstablishment(establishId: string): Promise<Queue[]> {
    return this.prisma.queue.findMany({
      where: { establishId },
      include: { tickets: true },
    });
  }

  async update(id: string, updateQueueDto: UpdateQueueDto): Promise<Queue> {
    return this.prisma.queue.update({
      where: { id },
      data: updateQueueDto,
    });
  }

  async delete(id: string): Promise<Queue> {
    return this.prisma.queue.delete({
      where: { id },
    });
  }
}
