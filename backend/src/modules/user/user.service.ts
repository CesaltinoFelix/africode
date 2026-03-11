import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);

    // Verificar se existem estabelecimentos vinculados
    const establishments = await this.prisma.establishment.findMany({
      where: { userId: id },
    });
    if (establishments.length > 0) {
      throw new BadRequestException(
        'Cannot delete user with active establishments',
      );
    }

    // Verificar se existem tickets vinculados
    const tickets = await this.prisma.ticket.findMany({
      where: { userId: id },
    });
    if (tickets.length > 0) {
      throw new BadRequestException('Cannot delete user with active tickets');
    }

    return this.userRepository.delete(id);
  }
}
