import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  prefix: string;

  @IsString()
  @IsNotEmpty()
  establishId: string;

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateQueueDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  prefix?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  currentNum?: number;
}
