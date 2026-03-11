import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/create-category.dto';
import { CategoryRepository } from './repository/category.repository';
import { Category } from './entities/category.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private prisma: PrismaService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existing = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );
    if (existing) {
      throw new ConflictException('Category already exists');
    }
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.findOne(id);
    if (updateCategoryDto.name) {
      const existing = await this.categoryRepository.findByName(
        updateCategoryDto.name,
      );
      if (existing && existing.id !== id) {
        throw new ConflictException('Category name already exists');
      }
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string): Promise<Category> {
    await this.findOne(id);

    // Verificar se existem estabelecimentos usando esta categoria
    const establishments = await this.prisma.establishment.findMany({
      where: { categoryId: id },
    });
    if (establishments.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with active establishments',
      );
    }

    return this.categoryRepository.delete(id);
  }
}
