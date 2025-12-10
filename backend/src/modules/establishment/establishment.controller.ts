import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import {
  CreateEstablishmentDto,
  UpdateEstablishmentDto,
} from './dto/create-establishment.dto';
import { Establishment } from './entities/establishment.entity';

@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  async create(
    @Body() createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    return this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  async findAll(): Promise<Establishment[]> {
    return this.establishmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Establishment> {
    return this.establishmentService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Establishment[]> {
    return this.establishmentService.findByUser(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    return this.establishmentService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Establishment> {
    return this.establishmentService.remove(id);
  }
}

