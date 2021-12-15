import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoTitleDto } from './dto/update-todo.dto';
import { GetTodosFilterDto } from './dto/get-todos-dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  async getTodosWithFilter(filterDto: GetTodosFilterDto): Promise<Todo[]> {
    const { title, description } = filterDto;
    return await this.model
      .find({ $or: [{ title }, { description }] })
      .lean()
      .exec();
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.model.find().lean().exec();
  }

  async getTodoById(id: string): Promise<Todo> {
    try {
      const res = await this.model.findById(id).lean().exec();
      return res;
    } catch (error) {
      throw new NotFoundException(`${error.reason}`);
    }
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await new this.model({
      id: uuid(),
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoTitleDto,
  ): Promise<Todo> {
    try {
      const res = await this.model
        .findByIdAndUpdate(id, { ...updateTodoDto })
        .lean()
        .exec();

      return res;
    } catch (error) {
      throw new NotFoundException(`${error.reason}`);
    }
  }

  async deleteTodo(id: string): Promise<Todo> {
    try {
      const res = await this.model.findByIdAndDelete(id).lean().exec();

      return res;
    } catch (error) {
      throw new NotFoundException(`${error.reason}`);
    }
  }
}
