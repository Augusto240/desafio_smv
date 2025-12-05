import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string, priority?: string, page?: number, limit?: number) {
    const where: any = {};

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

    const tasks = await this.prisma.task.findMany({
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

  async findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async create(data: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        priority: data.priority || 'media',
      },
    });
  }

  async update(id: string, data: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}