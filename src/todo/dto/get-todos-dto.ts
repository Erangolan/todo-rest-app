import { IsOptional, IsString } from 'class-validator';

export class GetTodosFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
