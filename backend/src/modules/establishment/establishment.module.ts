import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentRepository } from './repository/establishment.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstablishmentController],
  providers: [EstablishmentService, EstablishmentRepository],
  exports: [EstablishmentService, EstablishmentRepository],
})
export class EstablishmentModule {}
