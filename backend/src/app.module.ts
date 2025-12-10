import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { QueueModule } from './modules/queue/queue.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    UserModule,
    EstablishmentModule,
    QueueModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
