import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateQueueDto, UpdateQueueDto } from './dto/create-queue.dto';
import { QueueRepository } from './repository/queue.repository';
import { Queue } from './entities/queue.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QueueService {
  constructor(
    private queueRepository: QueueRepository,
    private prisma: PrismaService,
  ) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const establishment = await this.prisma.establishment.findUnique({
      where: { id: createQueueDto.establishId },
    });
    if (!establishment) {
      throw new BadRequestException('Establishment not found');
    }

    return this.queueRepository.create(createQueueDto);
  }

  async findAll(): Promise<Queue[]> {
    return this.queueRepository.findAll();
  }

  async findOne(id: string): Promise<Queue> {
    const queue = await this.queueRepository.findOne(id);
    if (!queue) {
      throw new NotFoundException('Queue not found');
    }
    return queue;
  }

  async findByEstablishment(establishId: string): Promise<Queue[]> {
    const establishment = await this.prisma.establishment.findUnique({
      where: { id: establishId },
    });
    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }

    return this.queueRepository.findByEstablishment(establishId);
  }

  async update(id: string, updateQueueDto: UpdateQueueDto): Promise<Queue> {
    await this.findOne(id);
    return this.queueRepository.update(id, updateQueueDto);
  }

  async remove(id: string): Promise<Queue> {
    await this.findOne(id);

    const tickets = await this.prisma.ticket.findMany({
      where: { queueId: id },
    });
    if (tickets.length > 0) {
      throw new BadRequestException('Cannot delete queue with active tickets');
    }

    return this.queueRepository.delete(id);
  }
}
