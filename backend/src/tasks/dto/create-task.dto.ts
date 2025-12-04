import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  status: string;

  @IsOptional()
  @IsDateString()
  due_date: Date;
}
