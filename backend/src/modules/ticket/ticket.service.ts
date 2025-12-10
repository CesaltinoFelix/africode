import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto, UpdateTicketDto } from './dto/create-ticket.dto';
import { TicketRepository } from './repository/ticket.repository';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
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
    return this.ticketRepository.findByQueue(queueId);
  }

  async findByUser(userId: string): Promise<Ticket[]> {
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
