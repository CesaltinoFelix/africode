import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTicketDto, UpdateTicketDto } from './dto/create-ticket.dto';
import { TicketRepository } from './repository/ticket.repository';
import { Ticket } from './entities/ticket.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(
    private ticketRepository: TicketRepository,
    private prisma: PrismaService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // Validar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createTicketDto.userId },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Validar se a fila existe
    const queue = await this.prisma.queue.findUnique({
      where: { id: createTicketDto.queueId },
    });
    if (!queue) {
      throw new BadRequestException('Queue not found');
    }

    // Validar se a fila está ativa
    if (queue.status !== 'active') {
      throw new BadRequestException('Queue is not active');
    }

    return this.ticketRepository.create(createTicketDto);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.findAll();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findByQueue(queueId: string): Promise<Ticket[]> {
    // Validar se a fila existe
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) {
      throw new NotFoundException('Queue not found');
    }

    return this.ticketRepository.findByQueue(queueId);
  }

  async findByUser(userId: string): Promise<Ticket[]> {
    // Validar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.ticketRepository.findByUser(userId);
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    await this.findOne(id);
    return this.ticketRepository.update(id, updateTicketDto);
  }

  async remove(id: string): Promise<Ticket> {
    await this.findOne(id);
    return this.ticketRepository.delete(id);
  }
}
