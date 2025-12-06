import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    userId: string,
    status?: string,
    priority?: string,
    page?: number,
    limit?: number,
  ) {
    const where: any = { userId };

    if (status === 'completed') {
      where.completed = true;
    } else if (status === 'pending') {
      where.completed = false;
    }

    if (priority) {
      where.priority = priority;
    }

    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const tasks = await this. prisma.task. findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this. prisma.task. count({ where });

    return {
      data: tasks,
      total,
      page: page || 1,
      limit: limit || total,
    };
  }

  async findOne(id: string, userId: string) {
    const task = await this. prisma.task. findFirst({
      where: { id, userId },
    });

    if (! task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async create(userId: string, data: CreateTaskDto) {
    return this.prisma. task.create({
      data: {
        title: data.title,
        priority: data.priority || 'media',
        userId,
      },
    });
  }

  async update(id: string, userId: string, data: UpdateTaskDto) {
    await this.findOne(id, userId);

    return this.prisma. task.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this. findOne(id, userId);

    return this.prisma. task.delete({ where: { id } });
  }
}