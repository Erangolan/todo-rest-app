import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosFilterDto } from './dto/get-todos-dto';
import { UpdateTodoTitleDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getAllTodos(@Query() filterDto: GetTodosFilterDto): Promise<Todo[]> {
    return Object.keys(filterDto).length
      ? await this.todoService.getTodosWithFilter(filterDto)
      : await this.todoService.getAllTodos();
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Patch('/:id/title')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoTitleDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.todoService.deleteTodo(id);
  }
}
