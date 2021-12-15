import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoTitleDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
