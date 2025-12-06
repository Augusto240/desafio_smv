import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';

interface GithubUserData {
  githubId: string;
  name: string;
  email: string | null;
  avatar: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateGithubUser(userData: GithubUserData) {
    let user = await this. prisma.user. findUnique({
      where: { githubId: userData. githubId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          githubId: userData.githubId,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
        },
      });
    } else {
      user = await this.prisma.user.update({
        where: { githubId: userData. githubId },
        data: {
          name: userData. name,
          email: userData.email,
          avatar: userData.avatar,
        },
      });
    }

    return user;
  }

  generateToken(user: any) {
    const payload = { sub: user.id, name: user.name };
    return this.jwtService.sign(payload);
  }
}