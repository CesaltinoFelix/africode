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

@Injectable()
export class EstablishmentService {
  constructor(private establishmentRepository: EstablishmentRepository) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
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
    return this.establishmentRepository.findByUserId(userId);
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    await this.findOne(id);
    return this.establishmentRepository.update(id, updateEstablishmentDto);
  }

  async remove(id: string): Promise<Establishment> {
    await this.findOne(id);
    return this.establishmentRepository.delete(id);
  }
}
