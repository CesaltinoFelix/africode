import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const queue = await this.prisma.queue.findUnique({
      where: { id: createTicketDto.queueId },
    });

    if (!queue) {
      throw new Error('Queue not found');
    }

    const number = `${queue.prefix}${queue.currentNum + 1}`;

    const ticket = await this.prisma.ticket.create({
      data: {
        number,
        position: createTicketDto.position,
        userId: createTicketDto.userId,
        queueId: createTicketDto.queueId,
      },
    });

    await this.prisma.queue.update({
      where: { id: createTicketDto.queueId },
      data: { currentNum: queue.currentNum + 1 },
    });

    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async findByQueue(queueId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: { queueId },
      orderBy: { position: 'asc' },
    });
  }

  async findByUser(userId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: { userId },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async delete(id: string): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
