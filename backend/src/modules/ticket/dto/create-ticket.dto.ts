import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  queueId: string;
}

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  calledAt?: Date;
}
