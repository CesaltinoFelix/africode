import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Get('queue/:queueId')
  async findByQueue(@Param('queueId') queueId: string): Promise<Ticket[]> {
    return this.ticketService.findByQueue(queueId);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Ticket[]> {
    return this.ticketService.findByUser(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.remove(id);
  }
}

