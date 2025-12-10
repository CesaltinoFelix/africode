import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { QueueRepository } from './repository/queue.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QueueController],
  providers: [QueueService, QueueRepository],
  exports: [QueueService, QueueRepository],
})
export class QueueModule {}
