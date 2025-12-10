import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQueueDto, UpdateQueueDto } from './dto/create-queue.dto';
import { QueueRepository } from './repository/queue.repository';
import { Queue } from './entities/queue.entity';

@Injectable()
export class QueueService {
  constructor(private queueRepository: QueueRepository) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
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
    return this.queueRepository.findByEstablishment(establishId);
  }

  async update(id: string, updateQueueDto: UpdateQueueDto): Promise<Queue> {
    await this.findOne(id);
    return this.queueRepository.update(id, updateQueueDto);
  }

  async remove(id: string): Promise<Queue> {
    await this.findOne(id);
    return this.queueRepository.delete(id);
  }
}
