import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateEstablishmentDto,
  UpdateEstablishmentDto,
} from './dto/create-establishment.dto';
import { EstablishmentRepository } from './repository/establishment.repository';
import { Establishment } from './entities/establishment.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EstablishmentService {
  constructor(
    private establishmentRepository: EstablishmentRepository,
    private prisma: PrismaService,
  ) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    // Validar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createEstablishmentDto.userId },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Validar se a categoria existe
    const category = await this.prisma.category.findUnique({
      where: { id: createEstablishmentDto.categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return this.establishmentRepository.create(createEstablishmentDto);
  }

  async findAll(): Promise<Establishment[]> {
    return this.establishmentRepository.findAll();
  }

  async findOne(id: string): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findOne(id);
    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }
    return establishment;
  }

  async findByUser(userId: string): Promise<Establishment[]> {
    // Validar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.establishmentRepository.findByUserId(userId);
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    await this.findOne(id);

    // Validar se a nova categoria existe (se fornecida)
    if (updateEstablishmentDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateEstablishmentDto.categoryId },
      });
      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    return this.establishmentRepository.update(id, updateEstablishmentDto);
  }

  async remove(id: string): Promise<Establishment> {
    await this.findOne(id);

    // Verificar se existem filas vinculadas
    const queues = await this.prisma.queue.findMany({
      where: { establishId: id },
    });
    if (queues.length > 0) {
      throw new BadRequestException(
        'Cannot delete establishment with active queues',
      );
    }

    return this.establishmentRepository.delete(id);
  }
}
