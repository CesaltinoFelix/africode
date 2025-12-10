import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto, UpdateQueueDto } from './dto/create-queue.dto';
import { Queue } from './entities/queue.entity';

@Controller('queues')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async create(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
    return this.queueService.create(createQueueDto);
  }

  @Get()
  async findAll(): Promise<Queue[]> {
    return this.queueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Queue> {
    return this.queueService.findOne(id);
  }

  @Get('establishment/:establishId')
  async findByEstablishment(
    @Param('establishId') establishId: string,
  ): Promise<Queue[]> {
    return this.queueService.findByEstablishment(establishId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQueueDto: UpdateQueueDto,
  ): Promise<Queue> {
    return this.queueService.update(id, updateQueueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Queue> {
    return this.queueService.remove(id);
  }
}
